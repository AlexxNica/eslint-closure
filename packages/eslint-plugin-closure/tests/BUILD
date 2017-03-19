package(default_visibility = ["//visibility:public"])

load("@io_bazel_rules_closure//closure:defs.bzl", "closure_js_library")
load("@io_bazel_rules_closure//closure:defs.bzl", "closure_js_binary")
load("//build_rules:mocha_closure_test.bzl", "mocha_closure_test")

mocha_closure_test(
    name = "ast-test-bin",
    srcs = ["ast-test.js"],
    entry_point = "closureLint.tests.ast",
    deps = [
        "//packages/eslint-plugin-closure/lib:ast",
        "//packages/eslint-plugin-closure/lib:test-utils",
        "//packages/eslint-plugin-closure/lib/externs:all-externs",
    ],
)

mocha_closure_test(
    name = "ast-matcher-test-bin",
    srcs = ["ast-matcher-test.js"],
    entry_point = "closureLint.tests.astMatcher",
    deps = [
        "//packages/eslint-plugin-closure/lib:ast-matcher",
        "//packages/eslint-plugin-closure/lib/externs:all-externs",
    ],
)

mocha_closure_test(
    name = "utils-test-bin",
    srcs = ["utils-test.js"],
    entry_point = "closureLint.tests.utils",
    deps = [
        "//packages/eslint-plugin-closure/lib:types",
        "//packages/eslint-plugin-closure/lib:utils",
        "//packages/eslint-plugin-closure/lib/externs:all-externs",
    ],
)

mocha_closure_test(
    name = "jsdoc-utils-test-bin",
    srcs = ["jsdoc-utils-test.js"],
    entry_point = "closureLint.tests.jsdocUtils",
    deps = [
        "//packages/eslint-plugin-closure/lib:jsdoc-utils",
        "//packages/eslint-plugin-closure/lib:test-utils",
        "//packages/eslint-plugin-closure/lib/externs:all-externs",
    ],
)