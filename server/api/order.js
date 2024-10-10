export default defineEventHandler(async (event) => {
    const body = await readBody(event);
  
    console.log('Полученный заказ:', body);
  
    return {
      success: true,
      message: 'Заказ успешно оформлен!',
    };
  });