export function GetRandomString(largo)
{
    let texto = '';
    let posible = 'ABCDEFGHIJKLMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(let a=0;a < largo;a++)
    {
        texto += posible.charAt(Math.floor(Math.random() * posible.length));
    }
    return texto;
}