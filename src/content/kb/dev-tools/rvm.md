---
title: RVM
description: Ruby Version Manager (on macOS) tricks
---

# RVM

Had a bunch of random issues with my Mac when trying to install RVM and compile certain rubies.

Get the following path with this `brew` command and then pass it into the stuff that is compiling ruby with either this
environment variable or by specifying `--with-openssl-dir` when running `rvm install`.

```shell
brew --prefix openssl@1.1
export RUBY_CONFIGURE_OPTS=--with-openssl-dir=<openssl path>
```

It also seemed necessary to do `rvm install` with the `--with-gcc` option because of an error compiling `sassc` in one
of my rails projects.

Another trick that saved the day was deleting whatever developer command line tools I had and reinstalling with:

```shell
rm -rf /Library/Developer/CommandLineTools
xcode-select --install
```

Finally - installing a certain gem in a certain rails project was failing due to a compiler error (probably wrong
version of either gcc or LLVM, resolved by the above developer tools reinstall, but I'm keeping this here in case it
helps a future me). These `-Wno-error=<error name>` flags allowed the compiler to kindly shut up and compile the native
extension please and thank you very much etc :)

```shell
gem install nio4r -v '1.2.1' --source 'https://rubygems.org/' -- --with-cflags="-Wno-error=implicit-function-declaration -Wno-error=incompatible-function-pointer-types"
```
