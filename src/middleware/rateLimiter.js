import ratelimit from "../config/upstash.js";

const rateLimiter = async (rea, res, next) => {
  try {
    // here is where we provide the user id or ipaddress
    const { success } = await ratelimit.limit('my-rate-limit')
    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later"
      })
    }
    next()
  } catch (error) {
    console.log("Rate Limit Error", error)
    next(error)
  }
}

export default rateLimiter;
