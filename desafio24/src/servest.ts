import { contentTypeFilter, createApp, serveStatic } from "https://deno.land/x/servest@v1.3.4/mod.ts"
import { config } from "./config/index.ts"
import coloresModel from "./models/colores.js"
import getColoresView from "./views/colores.js"

const denoApp = createApp()

denoApp.get("/", async (req) => {
    const colores = coloresModel.getAll();
    const coloresView = getColoresView(colores);

    await req.respond({
        status: 200,
        headers: new Headers({
            "content-type": "text/html; charset-utf-8"
        }),
        body: coloresView
    })
});

denoApp.post("/", contentTypeFilter("application/json"), async (req) => {
    const dataJSON = (await req.json()) as { color: string };
    coloresModel.add(dataJSON.color);

    req.respond({
        status: 200,
        headers: new Headers({
            "content-type": "application/json"
        }),
        body: JSON.stringify({
            success: true
        })
    })
});


denoApp.use(serveStatic("./src/public"));

denoApp.listen({ port: config.PORT });
console.log(`Deno server on: http://localhost:${config.PORT}`);