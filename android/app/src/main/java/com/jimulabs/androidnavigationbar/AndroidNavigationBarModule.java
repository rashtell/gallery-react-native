package com.jimulabs.androidnavigationbar;

import android.annotation.TargetApi;
import android.os.Build;
import android.util.Log;
import android.view.WindowManager;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.NativeViewHierarchyManager;
import com.facebook.react.uimanager.UIBlock;
import com.facebook.react.uimanager.UIManagerModule;

/**
 * Created by lintonye on 2017-02-10.
 */

public class AndroidNavigationBarModule extends ReactContextBaseJavaModule {

    private static final String LOG_TAG = "AndroidNavigationBar";

    public AndroidNavigationBarModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "AndroidNavigationBar";
    }

    @ReactMethod
    public void setBackgroundColor(final int color) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            UIManagerModule uiManager = getReactApplicationContext().getNativeModule(UIManagerModule.class);
            uiManager.addUIBlock(new UIBlock() {
                public void execute(NativeViewHierarchyManager nvhm) {
                    setNavigationBarColor(color);
                }
            });
        } else {
            Log.d(LOG_TAG, "Cannot set navigation bar color on API < " + Build.VERSION_CODES.LOLLIPOP);
        }
    }

    @ReactMethod
    public void setTranslucent(final boolean translucent) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            UIManagerModule uiManager = getReactApplicationContext().getNativeModule(UIManagerModule.class);
            uiManager.addUIBlock(new UIBlock() {
                public void execute(NativeViewHierarchyManager nvhm) {
                    setNavigationBarTranslucent(translucent);
                }
            });
        } else {
            Log.d(LOG_TAG, "Cannot set navigation bar color on API < " + Build.VERSION_CODES.KITKAT);
        }
    }

    @TargetApi(Build.VERSION_CODES.KITKAT)
    private void setNavigationBarTranslucent(boolean translucent) {
        int flag = translucent ? WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION : 0;
        getCurrentActivity().getWindow().setFlags(flag, WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
    }

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    private void setNavigationBarColor(int color) {
        getCurrentActivity().getWindow().setNavigationBarColor(color);
    }

}
