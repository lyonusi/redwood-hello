import { logger } from 'src/lib/logger'
import { verifyUser } from 'src/services/users/users'

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */
export const handler = async (event, _context) => {
  logger.info('Invoked verifyEmail function')
  console.log(
    'user email =',
    event.queryStringParameters.email,
    'verification code =',
    event.queryStringParameters.code
  )
  const verifiedStatus = await verifyUser(
    event.queryStringParameters.email,
    event.queryStringParameters.code
  )
  if (verifiedStatus.err) {
    console.log(
      'Failed to verify user verification code expiration time:',
      verifiedStatus.err.message
    )
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        error: { message: verifiedStatus.err.message },
      }),
    }
  }
  const user = verifiedStatus.res
  console.log(
    'Successfully verified user verification code and updated user email verification status for',
    event.queryStringParameters.email
  )
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      data: { user },
    }),
  }
}
