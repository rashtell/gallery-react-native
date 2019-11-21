package com.jimulabs.peekpalette;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Rect;
import android.graphics.drawable.Drawable;
import android.support.annotation.NonNull;
import android.support.v4.graphics.ColorUtils;
import android.support.v7.graphics.Palette;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.NativeViewHierarchyManager;
import com.facebook.react.uimanager.UIBlock;
import com.facebook.react.uimanager.UIManagerModule;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.ListIterator;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by lintonye on 2017-02-10.
 */

public class PeekPaletteModule extends ReactContextBaseJavaModule {


    public static final Pattern REGION_REGEX = Pattern.compile("(\\d{1,3})%,(\\d{1,3})%,(\\d{1,3})%,(\\d{1,3})%");
    private final ExecutorService mExectorService;

    public PeekPaletteModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mExectorService = Executors.newFixedThreadPool(1);
    }

    @Override
    public String getName() {
        return "PeekPalette";
    }

    @ReactMethod
    public void getSwatches(final int imageViewHandle, final ReadableMap options, final Promise promise) {
        UIManagerModule uiManager = getReactApplicationContext().getNativeModule(UIManagerModule.class);
        uiManager.addUIBlock(new UIBlock() {
            public void execute(NativeViewHierarchyManager nvhm) {
                final View view = nvhm.resolveView(imageViewHandle);
                if (view instanceof ImageView) {
                    extractSwatches((ImageView) view, options, promise);
                } else {
                    promise.reject("Wrong view type", "The underlying view must be an ImageView but it's " + view.getClass().getName());
                }
            }
        });
    }

    private void extractSwatches(final ImageView view, ReadableMap options, final Promise promise) {
        try {
            final int width = view.getMeasuredWidth();
            final int height = view.getMeasuredHeight();
            final Rect regionRect = options.hasKey("region")
                    ? parseRegion(options.getString("region"), width, height)
                    : null;
            final Drawable drawable = view.getDrawable();
            mExectorService.submit(new Runnable() {
                @Override
                public void run() {
                    try {
                        final Bitmap bmp = obtainBitmap(width, height);
                        Canvas canvas = new Canvas(bmp);
                        drawable.draw(canvas);
                        extractSwatches(bmp, regionRect, promise);
                    } catch (Throwable t) {
                        promise.reject("exception", t);
                    }
                }
            });
        } catch (Throwable t) {
            promise.reject("exception", t);
        }
    }

    private void extractSwatches(Bitmap bitmap, Rect region, Promise promise) {
        Palette.Builder builder = Palette.from(bitmap);
        if (region != null)
            builder = builder.setRegion(region.left, region.top, region.right, region.bottom);
        Log.d("PeekPalette", "region=" + region);
        Palette palette = builder.generate();

        List<Palette.Swatch> swatches = new ArrayList<>(palette.getSwatches());
        // sort by population desc
        Collections.sort(swatches, new Comparator<Palette.Swatch>() {
            @Override
            public int compare(Palette.Swatch lhs, Palette.Swatch rhs) {
                return rhs.getPopulation() - lhs.getPopulation();
            }
        });
        WritableArray aSwatches = Arguments.createArray();
        for (Palette.Swatch s : swatches) {
            WritableMap swatch = Arguments.createMap();
            swatch.putDouble("luminance", ColorUtils.calculateLuminance(s.getRgb()));
            swatch.putString("theme", calculateTheme(s.getHsl()));
            swatch.putString("color", intToRGB(s.getRgb()));
            swatch.putString("scrimColor", intToRGB(scrimify(s.getRgb())));
            swatch.putInt("population", s.getPopulation());
            swatch.putString("titleTextColor", intToRGBA(s.getTitleTextColor()));
            swatch.putString("bodyTextColor", intToRGBA(s.getBodyTextColor()));
            swatch.putString("swatchInfo", s.toString());
            aSwatches.pushMap(swatch);
        }
        promise.resolve(aSwatches);
    }

    private Rect parseRegion(@NonNull String region, int maxWidth, int maxHeight) {
        Matcher matcher = REGION_REGEX.matcher(region);
        if (matcher.matches()) {
            int left = Integer.parseInt(matcher.group(1)) * maxWidth / 100;
            int top = Integer.parseInt(matcher.group(2)) * maxHeight / 100;
            int right = Integer.parseInt(matcher.group(3)) * maxWidth / 100;
            int bottom = Integer.parseInt(matcher.group(4)) * maxHeight / 100;
            Rect rect = new Rect(left, top, right, bottom);
            if (rect.isEmpty()) throw new IllegalArgumentException("Empty region: " + region);
            return rect;
        } else {
            throw new IllegalArgumentException("Invalid region: " + region);
        }
    }

    private int scrimify(int rgb) {
        float[] hsl = new float[3];
        ColorUtils.colorToHSL(rgb, hsl);
        float lightnessMultiplier = 0.1f;
        if (isDark(hsl)) {
            lightnessMultiplier += 1f;
        } else {
            lightnessMultiplier = 1f - lightnessMultiplier;
        }
        hsl[2] = Math.max(0f, Math.min(1f, hsl[2] * lightnessMultiplier));
        return ColorUtils.HSLToColor(hsl);
    }

    private String calculateTheme(float[] hsl) {
        return isDark(hsl) ? "dark" : "light";
    }

    private boolean isDark(float[] hsl) {
        return hsl[2] < 0.5f;
    }

    private Bitmap obtainBitmap(int width, int height) {
        // TODO: perhaps we should pool the bitmap instead of creating one for each call
        return Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888);
    }

    private String intToRGB(int color) {
        return String.format("#%06X", (0xFFFFFF & color));
    }

    private String intToRGBA(int color) {
        color = Integer.rotateLeft(color, 8);
        return String.format("#%08X", (0xFFFFFFFF & color));
    }

}
