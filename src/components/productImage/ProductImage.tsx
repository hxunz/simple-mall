import Image from 'next/image';

type Props = {
  src: string
  alt: string
  width: number
  height: number
}

const ProductImage: React.FC<Props> = ({ src, alt, width, height }) => {
  const removeSrcWidth = src.slice(0, -3);

  return (
    <Image
      width={width}
      height={height}
      src={removeSrcWidth + width}
      alt={alt}
    />
  )
}

export default ProductImage;
