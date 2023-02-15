# 状态管理

本脚手架遵循 umijs@4 的约定式的状态管理，可以在 `src/models`, `src/pages/xxxx/models/` 目录中，
和 `src/pages/xxxx/model.{js,jsx,ts,tsx}` 文件引入 Model 文件。

需要注意的是，因为本脚手架默认开启了 dva，因此在 `src/models` 下的 model 的创建方式与其他约定式的 model 不同，
其更贴近 redux 的编写方式，而其他的 model 创建方式是以 hooks 的方式声明和调用。

* 具体使用方式请参照：https://umijs.org/docs/max/dva
* redux 官方文档：https://cn.redux.js.org/tutorials/essentials/part-1-overview-concepts/
* redux-saga 官方文档：https://redux-saga-in-chinese.js.org/index.html
* react-redux 官方文档：https://www.redux.org.cn/docs/react-redux/

## 如何声明 dva 式 model？
大致的结构如下：
```typescript
export default {
    // 命名空间
    namespace: 'demo',
    // 状态声明和初始化
    state: {
    },
    effects: {
        // 副作用方法，可以用来请求接口、分发其他 effects 或 reducers、数据的处理等
        *getUsers({ errorCreator }, { payload }, { put, select }) {}
    },
    reducers: {
        // 纯函数，返回的值即为要存入 demo 命名空间下的状态数据
        receive(state, action) {}
    }
};
```
细心地你可能发现，本脚手架中的 `effects` 的方法中的第一个参数 `{ errorCreator }` 与 dva 声明 `effects` 不同，这么做的理由是封装 dva 的统一错误处理。

## 最佳实践

我们建议在请求接口的 `effects` 中使用 `try...catch...` 捕获错误，同时在 `catch` 代码块中做如下处理：
```typescript
export default {
    effects: {
        // 副作用方法，可以用来请求接口、分发其他 effects 或 reducers、数据的处理等
        *getUsers({ errorCreator }, { payload }, { put, select }) {
            try {
                // 发起网络请求
            } catch (error) {
                // 其他错误逻辑代码
                // ↓↓↓
                throw errorCreator(undefined, error.message);
            }
        }
    },
};
```
`errorCreator` 方法接受 2 个参数：
* `type`: 错误提示的类型，主要分为 `info` / `error` / `success`，若不传默认为 `error` 类型;
* `message`: 错误提示的文案；
```typescript
const errorCreator = (actionType) => (type, message) => {
    if (typeof message === 'undefined') if (getPrimaryType(type) === 'Object' && type.message) return type;

    const errorType = !type ? ERROR_TYPES.ERROR : type;
    return {
        type: errorType,
        message,
        actionType
    };
};
```

当前本脚手架的错误提示组件为 Antd 的 `message`，如果想要更改提示组件，比如使用 Antd 的 `notification`，需要在 `src/app.ts` 中进行如下修改：
```typescript
import { notification } from 'antd';

export const dva = {
    config: {
        // ↓↓↓
        onError: onError(/* 👉 */notification, undefined),
        onEffect: dvaEffectHelper({ errorCreator }, createLoading({ effects: true }))
    }
};
```
