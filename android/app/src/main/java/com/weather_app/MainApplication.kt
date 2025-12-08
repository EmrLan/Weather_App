package com.weather_app

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import io.invertase.firebase.auth.ReactNativeFirebaseAuthPackage
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions

class MainApplication : Application(), ReactApplication {

  override val reactHost: ReactHost by lazy {
    getDefaultReactHost(
      context = applicationContext,
      packageList =
        PackageList(this).packages.apply {
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // add(MyReactNativePackage())
          add(ReactNativeFirebaseAuthPackage()) 
        },
    )
  }

  override fun onCreate() {
    super.onCreate()

    if (FirebaseApp.getApps(this).isEmpty()) {
        FirebaseApp.initializeApp(this); 
    }
    
    loadReactNative(this)
  }
}
