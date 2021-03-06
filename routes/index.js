// @ts-check
import * as base from '../utils/base.js'
import bodyParser from 'body-parser'
let jsonParser = bodyParser.json()

export function route (app) {
    base.debug('Index Route')
    app.get('/', async (req, res) => {
        try {
            res.type("application/json").status(200).send(base.getPrompts())
        } catch (error) {
            base.error(error)
            res.status(500).send(error.toString())
        }
    })
 
    app.put('/', jsonParser, async (req, res) => {
        try {
            let body = req.body
            body.isGui = true
            await base.setPrompts(body)
            return res.status(200).send({ status: 'ok' })
        } catch (error) {
            base.error(error)
            res.status(500).send(error.toString())
        }
    }) 
}