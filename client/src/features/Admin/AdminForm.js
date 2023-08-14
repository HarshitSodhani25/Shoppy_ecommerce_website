import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux"
import { fetchProductByIdAsync, selectAllBrands, selectAllCategories, selectProductById, clearSelectedProduct, updateProductAsync, createProductAsync } from '../Product-list/productlistSlice';

const AdminForm = () => {
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm()
  const Brands = useSelector(selectAllBrands);
  const Categories = useSelector(selectAllCategories);
  const selectedProduct = useSelector(selectProductById);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(()=>{
    if(params.id){
      dispatch(fetchProductByIdAsync(params.id));
    }else{
      dispatch(clearSelectedProduct());
    }
  }, [dispatch, params.id])
  
  useEffect(()=>{
    if(params.id && selectedProduct){
      setValue('title', selectedProduct.title);
      setValue('description', selectedProduct.description);
      setValue('price', selectedProduct.price);
      setValue('discountPercentage', selectedProduct.discountPercentage);
      setValue('stock', selectedProduct.stock);
      setValue('thumbnail', selectedProduct.thumbnail);
      setValue('brand', selectedProduct.brand);
      setValue('category', selectedProduct.category);
      setValue('image1', selectedProduct.images[0]);
      setValue('image2', selectedProduct.images[1]);
      setValue('image3', selectedProduct.images[2]);
    }
  }, [params.id, setValue, selectedProduct])


  const handleDelete = () => {
    const product = {...selectedProduct, delete:true}
    dispatch(updateProductAsync(product));
  }

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <form noValidate onSubmit={handleSubmit((data) => {
        const product = {...data};
        product.images = [product.image1, product.image2, product.image3]
        delete(product.image1);
        delete(product.image2);
        delete(product.image3);
        product.rating = 0;
        // product.price = Number(product.price)
        if(params.id){
          product.id = params.id;
          product.rating = selectedProduct.rating || 0;
          dispatch(updateProductAsync(product))
          reset();
        }else{
          dispatch(createProductAsync(product));
          reset();
        }
      })}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                  Title
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input type="text" {...register("title", { required: "title is required" })} name="title" id="title" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Iphone" />
                    <p className="text-red-500 font-semibold" >{errors.title ? errors.title.message : ""}</p>
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                  Description
                </label>
                <div className="mt-2">
                  <textarea id="description" type="text" name="description" {...register("description", { required: "description is required" })} rows={3} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Write a few sentences about product" />
                </div>
                <p className="text-red-500 font-semibold" >{errors.description ? errors.description.message : ""}</p>
              </div>
              {/* Thumbnail image url */}
              <div className="sm:col-span-4">
                <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">
                  Thumbnail image URL
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input type="text" {...register("thumbnail", { required: "thumbnail is required" })} name="thumbnail" id="thumbnail" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="" />
                  </div>
                  <p className="text-red-500 font-semibold" >{errors.thumbnail ? errors.thumbnail.message : ""}</p>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
                  image1 URL
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input type="text" {...register("image1", { required: "image is required" })} name="image1" id="image1" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Iphone" />
                  </div>
                  <p className="text-red-500 font-semibold" >{errors.image1 ? errors.image1.message : ""}</p>
                </div>
              </div>

              {/* image-3 */}
              <div className="sm:col-span-4">
                <label htmlFor="image2" className="block text-sm font-medium leading-6 text-gray-900">
                  image2 URL
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input type="text" {...register("image2", { required: "image is required" })} name="image2" id="image2" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Iphone" />
                  </div>
                  <p className="text-red-500 font-semibold" >{errors.image2 ? errors.image2.message : ""}</p>
                </div>
              </div>

              {/* image 4 */}
              <div className="sm:col-span-4">
                <label htmlFor="image3" className="block text-sm font-medium leading-6 text-gray-900">
                  Image3 URL
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input type="text" {...register("image3", { required: "image is required" })} name="image3" id="image3" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Iphone" />
                  </div>
                  <p className="text-red-500 font-semibold" >{errors.image3 ? errors.image3.message : ""}</p>
                </div>
              </div>

              {/* <div className="col-span-full">
                  <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                    Thumbnail Image
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed h-11 border-gray-900/25 ">
                    <div className="text-center">
                      <div className="mt-4 flex text-sm leading-6  text-gray-600">
                        <label
                          htmlFor="thumbnail" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                          <span>Upload a file</span>
                          <input id="thumbnail" name="thumbnail" type="file" className="sr-only" {...register("thumbnail", {required: "thumbnail is required"})} />
                          <p className="text-red-500 font-semibold" >{errors.thumbnail?errors.thumbnail.message:""}</p>

                        </label>
                      </div>
                    </div>
                  </div>
                </div> */}
            </div>
            <div className=" mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                  Brands
                </label>
                <div className="mt-2">
                  <select id="brand" {...register('brand')} name="brand" autoComplete="brand-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" >
                    <option>---Select Your Brand---</option>
                    {Brands.map((brand) => (
                      <option key={brand.label}>{brand.value}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                  Category
                </label>
                <div className="mt-2">
                  <select id="category" {...register('category')} name="category" autoComplete="category-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" >
                    <option>---Select Your Category---</option>
                    {Categories.map((category) => (
                      <option key={category.label}>{category.value}</option>
                    ))}
                  </select>
                </div>

              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                  Price
                </label>
                <div className="mt-2">
                  <input type="number" {...register("price", { required: "Price is required", min: 1 })} name="price" id="price" autoComplete="given-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="discountperc" className="block text-sm font-medium leading-6 text-gray-900">
                  Discount Percentage
                </label>
                <div className="mt-2">
                  <input type="number" {...register("discountPercentage", { required: "it is required", min: 0, max: 99 })} name="discountPercentage" id="discountPercentage" autoComplete="family-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                  Stock
                </label>
                <div className="mt-2">
                  <input id="stock" {...register("stock", { default: 0 })} name="stock" type="text" autoComplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>

          {selectedProduct && <button
            onClick={handleDelete}
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Delete
          </button>}

          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </main>
  )
}
export default AdminForm;