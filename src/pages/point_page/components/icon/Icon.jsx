
export default function Icon({ width, height, src, onClick }) {
    return (
        <img
            onClick={onClick}
            style={{cursor : 'pointer'}}
            src={src}
            width={width}
            height={height}
            alt={""}
        />
    );
}