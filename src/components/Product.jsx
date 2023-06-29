// Components
import Button from "./Button";

// Icons
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { BsFillCartPlusFill } from "react-icons/bs";

export default function Product({
  id,
  name,
  image,
  price,
  kategori,
  setEditedProduct,
  products,
  setProducts,
  cart,
  setCart,
}) {
  return (
    <div className="product">
      <img src={image} alt={name} />
      <section>
        <h2>{name}</h2>
        <p>
          {price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
          })}
          <span> </span>({kategori})
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div className="btn-keranjang">
            <Button
              style={{ height: 32, width: 12 }}
              title="Keranjang"
              onClick={
                () => {
                  cart.map((c) => {
                    c.id === id &&
                      setCart(
                        cart.map((c) =>
                          c.id === id && { ...c, count: c.count + 1 }
                        )
                      );
                    console.log(c.id);
                  });
                  products.map(
                    (product) =>
                      product.id === id &&
                      setCart([...cart, { ...product, count: 1 }])
                  );
                }
                // console.log(cart);
                // console.log(cart.id);
                // console.log(id);
              }
            >
              <BsFillCartPlusFill size={20} />
            </Button>
          </div>
          <div
            className="btn-action"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Button
              variant="tonal"
              onClick={() =>
                setEditedProduct({
                  id,
                  name,
                  image,
                  price,
                  kategori,
                })
              }
              style={{ height: 32, width: 12 }}
              title="Edit"
            >
              <AiFillEdit size={20} />
            </Button>
            <Button
              variant="tonal"
              style={{ height: 32, width: 32 }}
              onClick={() =>
                setProducts(products.filter((product) => product.id !== id))
              }
              title="Hapus"
            >
              <AiOutlineDelete size={20} />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
