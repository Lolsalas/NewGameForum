// pages/api/[...path].ts (o .js)

import { NextApiRequest, NextApiResponse } from 'next';
import httpProxy from 'http-proxy-middleware';


const target = 'localhost:8081'; 

const proxy = httpProxy.createProxyMiddleware({
  target: target,
  // Crucial: Hace que el proxy reemplace el encabezado 'host' para que Go no lo rechace
  changeOrigin: true, 
  // Elimina el prefijo /api de la URL antes de enviarla a Go
  pathRewrite: {
    '^/api': '', 
  },
  // Necesario para ignorar el certificado autofirmado de Go en desarrollo
  secure: false, 
  ws: true, 
});

export const config = {
  api: {
    bodyParser: false, 
    externalResolver: true, 
  },
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  proxy(req, res);
};