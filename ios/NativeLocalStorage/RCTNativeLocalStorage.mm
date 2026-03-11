#import "NativeLocalStorage.h"

@implementation NativeLocalStorage

// 🟢 THIS IS THE CRITICAL FIX: explicitly naming the module
RCT_EXPORT_MODULE(NativeLocalStorage)

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeLocalStorageSpecJSI>(params);
}

// Implement methods required by the Spec
- (void)setItem:(NSString *)value key:(NSString *)key {
  [[NSUserDefaults standardUserDefaults] setObject:value forKey:key];
}

- (NSString *)getItem:(NSString *)key {
  return [[NSUserDefaults standardUserDefaults] stringForKey:key];
}

- (void)removeItem:(NSString *)key {
  [[NSUserDefaults standardUserDefaults] removeObjectForKey:key];
}

- (void)clear {
  NSDictionary *defaults = [[NSUserDefaults standardUserDefaults] dictionaryRepresentation];
  for (NSString *key in defaults) {
    [[NSUserDefaults standardUserDefaults] removeObjectForKey:key];
  }
}

@end
