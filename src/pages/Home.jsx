import { useState } from "react";

// Components
import Product from "../components/Product";
import Button from "../components/Button";

// Icons
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";

export default function Home() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "MacBook Air 15”",
      image: "/macbook_air_15.jpg",
      price: 26999999,
      kategori: "Laptop",
    },
    {
      id: 2,
      name: "iPhone 14 Pro",
      image: "/iphone_14_pro.jpg",
      price: 19999999,
      kategori: "Smartphone",
    },
    {
      id: 3,
      name: "iPhone 14",
      image: "/iphone_14.jpg",
      price: 15999999,
      kategori: "Smartphone",
    },
    {
      id: 4,
      name: "Apple Vision Pro",
      image: "/apple_vision_pro.jpg",
      price: 66999999,
      kategori: "Headset",
    },
    {
      id: 5,
      name: "Apple Watch Series 8",
      image: "apple_watch_series_8.jpg",
      price: 7999999,
      kategori: "Smartwatch",
    },
    {
      id: 6,
      name: "iPad Pro",
      image: "/ipad_pro.jpg",
      price: 15999999,
      kategori: "Tablet",
    },
    {
      id: 7,
      name: "MacBook Air 15”",
      image: "/macbook_air_15.jpg",
      price: 26999999,
      kategori: "Laptop",
    },
    {
      id: 8,
      name: "iPhone 14 Pro",
      image: "/iphone_14_pro.jpg",
      price: 19999999,
      kategori: "Smartphone",
    },
    {
      id: 9,
      name: "iPhone 14",
      image: "/iphone_14.jpg",
      price: 15999999,
      kategori: "Smartphone",
    },
    {
      id: 10,
      name: "Apple Vision Pro",
      image: "/apple_vision_pro.jpg",
      price: 66999999,
      kategori: "Headset",
    },
    {
      id: 11,
      name: "Apple Watch Series 8",
      image: "apple_watch_series_8.jpg",
      price: 7999999,
      kategori: "Smartwatch",
    },
    {
      id: 12,
      name: "iPad Pro",
      image: "/ipad_pro.jpg",
      price: 15999999,
      kategori: "Tablet",
    },
  ]);
  const [keyword, setKeyword] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(4)
  const [editedProduct, setEditedProduct] = useState();
  const [newProduct, setNewProduct] = useState();
  const [incrementId, setIncrementId] = useState(products.length + 1);
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)

  const filteredSortedProducts = products
    .toSorted((a, b) => {
      if (sortOrder === "asc") {
        return a[sortBy] < b[sortBy] ? -1 : 1;
      } else {
        return a[sortBy] > b[sortBy] ? -1 : 1;
      }
    })
    .filter(
      (product) =>
        product.name.toLowerCase().includes(keyword) &&
        product.price >= minPrice &&
        product.price <= maxPrice
    );

  return (
    <div className="products">
      <header>
        <Button onClick={() => setNewProduct({ id: incrementId })}>
          <AiOutlinePlusCircle size={24} /> Tambah
        </Button>
        <label>
          Cari:
          <input
            type="text"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              setPage(1);
            }}
          />
        </label>
        <section>
          Harga:
          <label>
            Minimal:
            <input
              type="number"
              value={minPrice}
              onChange={(e) => {
                setMinPrice(e.target.value);
                setPage(1);
              }}
            />
          </label>
          <label>
            Maksimal:
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(e.target.value || Infinity);
                setPage(1);
              }}
            />
          </label>
        </section>
        <section>
          Urutkan:
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setPage(1);
            }}
          >
            <option value="id">Normal</option>
            <option value="name">Nama</option>
            <option value="price">Harga</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
              setPage(1);
            }}
          >
            <option value="asc">Naik</option>
            <option value="desc">Turun</option>
          </select>
        </section>
        <Button style={{ display: "flex", alignItems: "center" }} onClick={() => setShowCart(true)}>
          <BsFillCartFill size={20} /> <p>{cart.reduce((a, p) => a + p.count, 0)}</p>
        </Button>
      </header>
      <main>
        {filteredSortedProducts.length > 0
          ? filteredSortedProducts
              .filter((_product, i) => i >= pageLimit * page - pageLimit && i < pageLimit * page)
              .map((product) => (
                <Product
                  key={product.id}
                  {...product}
                  setEditedProduct={setEditedProduct}
                  products={products}
                  setProducts={setProducts}
                  cart={cart}
                  setCart={setCart}
                />
              ))
          : "Tidak ada produk ditemukan."}
      </main>
      <footer>
        <label>
          Jumlah produk ditampilkan:
          <input type="number" value={pageLimit} onChange={(e) => setPageLimit(parseInt(e.target.value))} />
        </label>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Sebelumnya
        </Button>
        {filteredSortedProducts
          .filter((_product, i) => i % pageLimit === 0)
          .map((_product, i) => (
            <button
              key={i}
              className="page-number"
              onClick={() => setPage(i + 1)}
              disabled={i + 1 === page}
            >
              {i + 1}
            </button>
          ))}
        <Button
          onClick={() => setPage(page + 1)}
          disabled={page === Math.ceil(filteredSortedProducts.length / pageLimit)}
        >
          Berikutnya
        </Button>
      </footer>
      {newProduct && (
        <form
          className="dialog"
          onSubmit={(e) => {
            e.preventDefault();
            setProducts([...products, newProduct]);
            console.log(newProduct);
            setNewProduct(undefined);
            setIncrementId(incrementId + 1);
          }}
        >
          <h1>Tambah Produk</h1>
          <label>
            ID:
            <input type="text" value={newProduct.id} readOnly />
          </label>
          <label>
            Nama:
            <input
              type="text"
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
          </label>
          <label>
            Gambar:
            <input
              type="text"
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  image: e.target.value,
                })
              }
            />
          </label>
          <label>
            Harga:
            <input
              type="number"
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  price: parseInt(e.target.value),
                })
              }
            />
          </label>
          <label>
            Kategori;
            <select
              value={newProduct.kategori}
              onChange={(e) =>
                setNewProduct({ ...newProduct, kategori: e.target.value })
              }
            >
              <option hidden>Pilih kategori</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Laptop">Laptop</option>
              <option value="Smartwatch">Smartwatch</option>
              <option value="Tablet">Tablet</option>
              <option value="Headset">Headset</option>
            </select>
          </label>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              type="reset"
              variant="tonal"
              onClick={() => setNewProduct(undefined)}
            >
              Batal
            </Button>
            <Button>Simpan</Button>
          </div>
        </form>
      )}
      {editedProduct && (
        <form
          className="dialog"
          onSubmit={(e) => {
            e.preventDefault();
            setProducts(
              products.map((product) =>
                product.id === editedProduct.id ? editedProduct : product
              )
            );
            setEditedProduct(undefined);
          }}
        >
          <h1>Edit Produk</h1>
          <label>
            ID:
            <input type="text" value={editedProduct.id} readOnly />
          </label>
          <label>
            Nama
            <input
              type="text"
              value={editedProduct.name}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, name: e.target.value })
              }
              autoFocus
            />
          </label>
          <label>
            Gambar:
            <input
              type="text"
              value={editedProduct.image}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  image: e.target.value,
                })
              }
            />
          </label>
          <label>
            Harga
            <input
              type="number"
              value={editedProduct.price}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  price: parseInt(e.target.value),
                })
              }
            />
          </label>
          <label>
            Kategori;
            <select
              value={editedProduct.kategori}
              onChange={(e) =>
                setNewProduct({ ...editedProduct, kategori: e.target.value })
              }
            >
              <option value="Smartphone">Smartphone</option>
              <option value="Laptop">Laptop</option>
              <option value="Smartwatch">Smartwatch</option>
              <option value="Tablet">Tablet</option>
              <option value="Headset">Headset</option>
            </select>
          </label>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              type="reset"
              variant="tonal"
              onClick={() => setEditedProduct(undefined)}
            >
              Batal
            </Button>
            <Button>Simpan</Button>
          </div>
        </form>
      )}
      {showCart && (
        <div className="dialog">
          <h1>Keranjang</h1>
          <table style={{ border:"2px solid black" }}>
            <thead>
              <tr style={{ border:"2px solid black" }}>
                <th>ID</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody style={{ border:"2px solid black" }}>
              {cart.map((c) => (
                <tr key={c.id} style={{ border:"2px solid black" }}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>
                    <Button>tambah</Button>
                    <Button>hapus</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>Jumlah yang harus dibayarkan: {cart.reduce((a, p) => a + p.price, 0).toLocaleString("id-ID", {style: "currency", currency: "IDR"})}</p>
          <Button onClick={() => setShowCart(false)}>Tutup</Button>
        </div>
      )}
    </div>
  );
}
