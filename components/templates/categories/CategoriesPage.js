import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  MdKeyboardDoubleArrowDown,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { useSelector } from "react-redux";

function CategoriesPage() {
  const { loading, categories } = useSelector((state) => state.categories);
  const [categoryActive, setCategoryActive] = useState(0);

  if (loading) return <h1>loading ...</h1>;

  return (
    <div className="container mx-auto px-2 pt-12">
      <div className="categories-content">
        {categories.data.map((item, index) => (
          <div
            key={item._id}
            className={`${index === categoryActive && "active"} category-item`}
            onClick={() => setCategoryActive(index)}
          >
            <div className="category-item__title">
              <Link href={`/search?category=${item._id}`}>{item.name}</Link>
              <span>
                {categoryActive === index ? (
                  <MdKeyboardDoubleArrowDown className="text-3xl text-bg-primary" />
                ) : (
                  <MdKeyboardDoubleArrowUp className="text-3xl text-bg-primary" />
                )}
              </span>
            </div>
            <div className="category-item__body">
              <div className="category-item__brands">
                {item.brands.map((brand, bIndex) => (
                  <Link key={bIndex} href={`/search?category=${item._id}&&brand=${brand.name}`}>
                    {brand.name}
                  </Link>
                ))}
              </div>
              <div className="category-item__image">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={200}
                  height={200}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesPage;
