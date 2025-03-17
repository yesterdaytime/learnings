# express

1. 加载 static 文件，可以访问 assets files

    app.static(path)

2. 加载 ejs 文件

    app.set('views', './views');

    app.render('index', { title: 'Welcome', msg: "I'm the welcome page" })

3. 加载中间件

    app.use(fn)

4. 加载 router

    app.use('/api/posts', postRouter);

5. request

    app: get(), post(), put(), delete()

    router: get(), post(), put(), delete()

6. 加载 env

    node --env-file=.env app

    const port = process.env.PORT;
