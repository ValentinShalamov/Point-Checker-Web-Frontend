export function isHit(point) {
    return (doesRectangleContainPoint(point)
        || doesTriangleContainPoint(point)
        || doesQuarterCircleContainPoint(point));
}

function doesRectangleContainPoint(point) {
    return point.x >= -point.radius && point.x <= 0
        && point.y >= 0 && point.y <= point.radius / 2.0;
}

function doesTriangleContainPoint(point) {
    if (point.y < -point.radius / 2.0 || point.y > 0
        || point.x < -point.radius || point.x > 0) {
        return false;
    }
    let minY = -0.5 * point.x - point.radius / 2.0;

    return point.y >= minY;
}

function doesQuarterCircleContainPoint(point) {
    if (point.x < 0 || point.x > point.radius / 2.0
        || point.y > 0 || point.y < -point.radius / 2.0) {
        return false;
    }
    return Math.pow(point.x, 2) + Math.pow(point.y, 2) <= Math.pow(point.radius / 2.0, 2);
}