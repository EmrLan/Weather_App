require "json"

# We still read version from package.json, but hardcode the rest to pass validation
package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name            = "RTNNativeLocalStorage"
  s.version         = package["version"]
  s.summary         = "A Turbo Native Module for Local Storage"
  s.description     = "Demonstration of a Turbo Native Module for React Native New Architecture."
  s.homepage        = "https://github.com/example/weather-app"
  s.license         = "MIT"
  s.platforms       = { :ios => "12.4" }
  s.author          = { "Landry Karangwa" => "emr7059@gmail.com" }
  s.source          = { :git => "https://github.com/example/weather-app.git", :tag => "#{s.version}" }

  s.source_files    = "ios/NativeLocalStorage/**/*.{h,m,mm}"

  s.dependency "React-Core"
  s.dependency "React-RCTFabric"
  s.dependency "React-Codegen"
  s.dependency "RCT-Folly"
  s.dependency "RCTRequired"
  s.dependency "RCTTypeSafety"
  s.dependency "ReactCommon/turbomodule/core"
end