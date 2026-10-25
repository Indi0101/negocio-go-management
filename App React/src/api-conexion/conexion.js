const API_URL = import.meta.env.VITE_API_URL?.replace(/\$/,"");

if(!API_URL)
{
    throw new Error("Falta configurar .env VITE_API_URL");
}

let accessToken=null;

export function setAccessToken(token){
     accessToken=token;
}

export async function request(path,{method = "GET", body, headers, ...option}={}) {

    const response = await fetch(
        `${API_URL}${path}`,
        {...option,
            method,
            headers:{
                Accept: "application/json",
                ...(body !==undefined && {"Content-type": "application/json" }),
                ...(accessToken && {Authorization:`Bearer ${accessToken}`}),
                ...headers,
            },
            ...(body!== undefined && {body: JSON.stringify(body)}),
        }
    );

    const text = await response.text();
    let data = text || null;

    if(text && response.headers.get("content-type")?.includes("json")){
        try{
            data = JSON.parse(text);
        }catch{
            // Conserva el texto si el servidor devuelve JSON inválido.
        }
    }

    if(!response.ok)
    {
        const error = new Error(data?.message || data?.datail || `Error HTTP ${response.status}`)
        error.status=response.status;
        error.data=data;
        throw error
    }

    return data;

}