import dotenv from 'dotenv';
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import requestIp from 'request-ip';

dotenv.config();

const IS_RATE_LIMITER_ON = true;
const HEADERS = {
    X_RATE_LIMIT_LIMIT: 'X-RateLimit-Limit',
    X_RATE_LIMIT_REMAINING: 'X-RateLimit-Remaining',
}
const RATE_LIMITER_PARAMS = {
    MAX_REQUEST_COUNT: 5,
    WINDOW: "60 s",
}
let redis, ratelimit;
const isRateLimitingSet = checkIsRateLimitingSet();

if (isRateLimitingSet) {
    redis = new Redis({
        url: process.env.UPSTASH_REDIS_URL,
        token: process.env.UPSTASH_REDIS_TOKEN,
    });

    ratelimit = new Ratelimit({
        redis,
        limiter: Ratelimit.fixedWindow(
            RATE_LIMITER_PARAMS.MAX_REQUEST_COUNT,
            RATE_LIMITER_PARAMS.WINDOW
        ),
    });
}

export async function rateLimiter(req, res) {
    if (!isRateLimitingSet) {
        return true;
    }

    const identifier = requestIp.getClientIp(req); //TODO: use fingerprint AND/OR user session instead of IP
    const result = await ratelimit.limit(identifier);
    res.setHeader(HEADERS.X_RATE_LIMIT_LIMIT, result.limit);
    res.setHeader(HEADERS.X_RATE_LIMIT_REMAINING, result.remaining);

    return result.success 
}

function checkIsRateLimitingSet() {
    if (!IS_RATE_LIMITER_ON) {
        return false;
    }

    const isProduction = process.env.NODE_ENV === 'production';

    if(!isProduction) {
        return false;
    }

    const isRedisUrlSet = Boolean(process.env.UPSTASH_REDIS_URL);

    if(!isRedisUrlSet) {
        return false;
    }

    const isRedisTokenSet = Boolean(process.env.UPSTASH_REDIS_TOKEN);

    if(!isRedisTokenSet) {
        return false;
    }

    return true;
}
