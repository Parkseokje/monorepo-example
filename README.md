# Monorepo Example

## Homebrew 설치

```
$ brew install node
$ brew install watchman
```

## XCODE 설치 (약 11.3GB, 오래걸림)

- [설치url](https://apps.apple.com/kr/app/xcode/id497799835?l=en&mt=12)
- 설치 후 실행하여 components 설치

## CocoaPods 설치

```
$ sudo gem install cocoapods
```

## RN 프로젝트 생성

```bash
$ mkdir packages
$ cd packages
$ npx react-native init mobile --template react-native-template-typescript
$ cd mobile
$ rm yarn.lock && rm -rf node_modules && rm -rf .git
```

## Web 프로젝트 생성 - CRA

```bash
$ cd packages
$ npx create-react-app web --template typescript
$ rm yarn.lock && rm -rf node_modules && rm -rf .git
```

## root

From: ./

### 초기화

```bash
$ yarn init -y
```

### package.json 수정

```json
{
  "name": "react-native-monorepo",
  "private": true,
  "workspaces": {
    "packages": ["packages/*"],
    "nohoist": ["**/react-native", "**/react-native/**"]
  },
  "dependencies": {}
}
```

### .gitignore

```
.DS_Store
.vscode
node_modules/
yarn-error.log
```

### 패키지 설치

```
$ yarn install
$ yarn workspace web add babel-jest eslint
```

## mobile

### `packages/mobile/metro.config.js` 수정

```javascript
const path = require("path");

module.exports = {
  projectRoot: path.resolve(__dirname, "../../"),
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
```

## xcode

### xcode 실행

```bash
$ open packages/mobile/ios/myproject.xcodeproj/
```

### xcode > AppDelegate.m 수정

```
...
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"packages/mobile/index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}
```

### xcode > Build Phases 수정

`Project Navigator > Build Phases > Bundle React Native code and Images` 에서 수정

```
export NODE_BINARY=node
export EXTRA_PACKAGER_ARGS="--entry-file packages/mobile/index.js --reset-cache"
../../../node_modules/react-native/scripts/react-native-xcode.sh
```

## mobile 시작

### metro 서버 시작 (root)

```bash
$ yarn workspace mobile start
```

### ios app 시작 (root)

```bash
$ yarn workspace mobile ios # 초기 한번만(빌드, 시뮬레이터 인스톨)
```

### 에러날 경우

```bash
$ cd packages/mobile/ios
$ pod install # ?
```

### xcode에서 직접 시뮬레이터 시작

[이슈] xcode에서 `Build and Run`할 경우 에러 남

## web

### root에서 web app 시작하기

```bash
$ yarn workspace web start
```

### web에 공통 lib 설치

`@` 뒤에 버젼 정보 명시해야함. 안할 경우 npm registry에서 검색.

```bash
$ yarn workspace web add @mono/theme@1.0.0
```

## 공통 라이브러리

### watch

공통 라이브러리 폴더의 package.json의 name, version(@mono/theme)과 일치해야 함.

```
yarn workspace @mono/theme watch
```

## 참고 문서

- [monorepo walkthrough](https://medium.com/@ratebseirawan/react-native-0-63-monorepo-walkthrough-36ea27d95e26)
- [monorepo tutorial](https://y0c.github.io/2019/06/14/monorepo-tutorial/)
