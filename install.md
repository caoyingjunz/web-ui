# Install WEB-UI

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### server 发布
```
npm install express -S
```

### 新建 app.js
```
const express = require('express')
const app = express()

app.use(express.static('./dist'))

app.listen(80,()=>{
    console.log('server running at :80')
})
```

### 启动 app
```
node ./app.js
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
