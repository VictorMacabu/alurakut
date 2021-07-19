import { SiteClient } from 'datocms-client';

export default async function recebedorRequests(request, response){
    
    if(request.method === 'POST'){
        const TOKEN =  '742d9ebc9172e8ad1ce1ccfd604596';
        const client = new SiteClient(TOKEN);
    
        const registroCriado = await client.items.create({
            itemType: '975848',
            ...request.body,
         /* title:'',
            image:'',
            linkurl:'',
            keyid:'' */
        })
    
        console.log(registroCriado); // backend da aplicação
    
        response.json({
            dados:'',
            registroCriado: registroCriado,
        })
        return;
    }

    response.status(404).json({
        message: 'GET not return'
    })
    
}