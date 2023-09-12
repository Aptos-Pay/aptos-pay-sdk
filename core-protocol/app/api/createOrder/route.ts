import { createOrder } from 'aptos-pay';
import { NextResponse } from 'next/server';
import { config } from 'dotenv';
config({ path: '../.env' });

export async function POST(request: Request, response: Response) {
  try {
    // const { receiverAddress, amount } = request.body;

    const orderCreationResult = await createOrder(
      8888,
      process.env.PRIVATE_KEY as string,
      process.env.MODULE_ADDRESS as string
    );

    if (!orderCreationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Order creation failed',
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        success: orderCreationResult.success,
        message: 'Order created',
        orderId: orderCreationResult.orderId,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return new Response(error);
  }
}