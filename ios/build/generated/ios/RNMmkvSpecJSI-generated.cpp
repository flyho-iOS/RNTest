/**
 * This code was generated by [react-native-codegen](https://www.npmjs.com/package/react-native-codegen).
 *
 * Do not edit this file as changes may cause incorrect behavior and will be lost
 * once the code is regenerated.
 *
 * @generated by codegen project: GenerateModuleCpp.js
 */

#include "RNMmkvSpecJSI.h"

namespace facebook::react {

static jsi::Value __hostFunction_NativeMmkvCxxSpecJSI_initialize(jsi::Runtime &rt, TurboModule &turboModule, const jsi::Value* args, size_t count) {
  return static_cast<NativeMmkvCxxSpecJSI *>(&turboModule)->initialize(
    rt,
    count <= 0 ? throw jsi::JSError(rt, "Expected argument in position 0 to be passed") : args[0].asString(rt)
  );
}
static jsi::Value __hostFunction_NativeMmkvCxxSpecJSI_createMMKV(jsi::Runtime &rt, TurboModule &turboModule, const jsi::Value* args, size_t count) {
  return static_cast<NativeMmkvCxxSpecJSI *>(&turboModule)->createMMKV(
    rt,
    count <= 0 ? throw jsi::JSError(rt, "Expected argument in position 0 to be passed") : args[0].asObject(rt)
  );
}

NativeMmkvCxxSpecJSI::NativeMmkvCxxSpecJSI(std::shared_ptr<CallInvoker> jsInvoker)
  : TurboModule("MmkvCxx", jsInvoker) {
  methodMap_["initialize"] = MethodMetadata {1, __hostFunction_NativeMmkvCxxSpecJSI_initialize};
  methodMap_["createMMKV"] = MethodMetadata {1, __hostFunction_NativeMmkvCxxSpecJSI_createMMKV};
}
static jsi::Value __hostFunction_NativeMmkvPlatformContextCxxSpecJSI_getBaseDirectory(jsi::Runtime &rt, TurboModule &turboModule, const jsi::Value* args, size_t count) {
  return static_cast<NativeMmkvPlatformContextCxxSpecJSI *>(&turboModule)->getBaseDirectory(
    rt
  );
}
static jsi::Value __hostFunction_NativeMmkvPlatformContextCxxSpecJSI_getAppGroupDirectory(jsi::Runtime &rt, TurboModule &turboModule, const jsi::Value* args, size_t count) {
  auto result = static_cast<NativeMmkvPlatformContextCxxSpecJSI *>(&turboModule)->getAppGroupDirectory(
    rt
  );
  return result ? jsi::Value(std::move(*result)) : jsi::Value::null();
}

NativeMmkvPlatformContextCxxSpecJSI::NativeMmkvPlatformContextCxxSpecJSI(std::shared_ptr<CallInvoker> jsInvoker)
  : TurboModule("MmkvPlatformContext", jsInvoker) {
  methodMap_["getBaseDirectory"] = MethodMetadata {0, __hostFunction_NativeMmkvPlatformContextCxxSpecJSI_getBaseDirectory};
  methodMap_["getAppGroupDirectory"] = MethodMetadata {0, __hostFunction_NativeMmkvPlatformContextCxxSpecJSI_getAppGroupDirectory};
}


} // namespace facebook::react
