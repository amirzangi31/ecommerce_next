import Image from "next/image";
import React from "react";

function ProductPage({ product }) {
  return (
    <div>
      <div className="container mx-auto py-12">
        <Image src={product.images[0].link} alt="aksldn" width={500} height={300} />
        {product.name}
      </div>
    </div>
  );
}

export default ProductPage;
