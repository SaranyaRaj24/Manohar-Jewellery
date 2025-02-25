// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faXmark, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
// import Table from "react-bootstrap/Table";
// import { useParams, useLocation } from "react-router-dom";
// import "../Products/Products.css";
// import WeightFormPopup from "./View";
// import Navbarr from "../Navbarr/Navbarr";
// import { transform_text } from "../utils";
// import jsPDF from "jspdf";
// // import html2canvas from "html2canvas";
// import "jspdf-autotable";

// const Products = () => {
//   const { lot_id } = useParams();
//   const location = useLocation();
//   const [showAddItemsPopup, setShowAddItemsPopup] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [showBarcode, setShowBarcode] = useState(false);
//   const searchParams = new URLSearchParams(location.search);
//   const lotnameQuery = searchParams.get("lotname");
//   const [lotNumber, setLotNumber] = useState(lotnameQuery || lot_id || "");
//   const [bulkWeightBefore, setBulkWeightBefore] = useState("");
//   const [bulkWeightAfter, setBulkWeightAfter] = useState("");
//   const [beforeWeight, setBeforeWeight] = useState("");
//   const [afterWeight, setAfterWeight] = useState("");
//   const [productNumber, setProductNumber] = useState("");
//   const [productWeight, setProductWeight] = useState("");
//   const [finalWeight, setFinalWeight] = useState("");
//   const [difference, setDifference] = useState("");
//   const [adjustment, setAdjustment] = useState("");
//   const [selectedProductId, setSelectedProductId] = useState(null);
//   const [status, setStatus] = useState("");
//   const [showPopup, setShowPopup] = useState({ id: null, value: false });
//   const afterWeightRef = useRef(null);
//   const differenceRef = useRef(null);
//   const adjustmentRef = useRef(null);
//   const finalWeightRef = useRef(null);
//   const productNumberRef = useRef(null);
//   const productWeightRef = useRef(null);
//   const [filterOpt, setFilterOpt] = useState("all");

//     const exportPDF = () => {
//     const doc = new jsPDF();
//     const tableHeaders = ["S.No", "Product Number", "Before Weight", "After Weight", "Difference", "Adjustment", "Final Weight", "Barcode Weight"];
//     const tableData = products.map((product, index) => [
//       index + 1,
//       transform_text(product.product_number),
//       product.before_weight,
//       product.after_weight,
//       product.difference,
//       product.adjustment,
//       product.final_weight,
//       product.barcode_weight,
//     ]);
//     const totalBeforeWeight = filterProducts.reduce((acc, product) => acc + parseFloat(product.before_weight || 0), 0).toFixed(3);
//     const totalAfterWeight = filterProducts.reduce((acc, product) => acc + parseFloat(product.after_weight || 0), 0).toFixed(3);
//     const totalDifference = filterProducts.reduce((acc, product) => acc + parseFloat(product.difference || 0), 0).toFixed(3);
//     const totalAdjustment = filterProducts.reduce((acc, product) => acc + parseFloat(product.adjustment || 0), 0).toFixed(3);
//     const totalFinalWeight = filterProducts.reduce((acc, product) => acc + parseFloat(product.final_weight || 0), 0).toFixed(3);

//     const footerData = [
//       ['', 'Total Weight =', totalBeforeWeight, totalAfterWeight, totalDifference, totalAdjustment, totalFinalWeight]
//     ];
  
//     doc.autoTable({
//       head: [tableHeaders],
//       body: [...tableData, ...footerData], 
//       theme: 'grid',
//       margin: { top: 13 },
//       styles: { fontSize: 10, cellPadding: 2 },
//       headStyles: { fillColor: [36, 36, 66], halign: 'center' },
//       bodyStyles: { fillColor: [255, 255, 255], halign: 'center' },
//       columnStyles: {
//         0: { halign: 'center' }, 
//         1: { halign: 'center' }, 
//         2: { halign: 'center' },  
//         3: { halign: 'center' },  
//         4: { halign: 'center' },  
//         5: { halign: 'center' },  
//         6: { halign: 'center' },  
//         7: { halign: 'center' },  
//       }
//     });

//     doc.save("product_details.pdf");
//   };

  
//   const handleKeyDown = (e, nextField) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       nextField.current.focus();
//     }
//   };
 
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/products/getAll/${lot_id}`);
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Failed to fetch products:", error);
//       }
//     };
//     fetchProducts();
//   }, [lot_id]);

//   const handleAddItems = () => {
//     setShowAddItemsPopup(true);
//   };

//   const openPopup = (id) => {
//     setShowPopup({ id });
//   };
//   const handleSaveee = (productId) => {
//     setSelectedProductId(productId);
//     setShowPopup(true);
//   };
//   const closePopup = () => {
//     setShowPopup({ id: null });
//   };
//   const closeAddItemsPopup = () => {
//     setShowAddItemsPopup(false);
//   };

//   useEffect(() => {
//     const fetchLotDetails = async () => {
//       console.log("Fetching lot details...");
//       try {
//         const response = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/lot/lot_data`,
//           {
//             lot_id,
//           }
//         );
//         const lotData = response.data;
//         console.log("Fetched Lot Data:", lotData);
//         if (lotData) {
//           setBulkWeightBefore(lotData.result.bulk_weight_before || "");
//           setBulkWeightAfter(lotData.result.bulk_after_weight || "");
//         }
//       } catch (error) {
//         console.error("Failed to fetch lot details:", error);

//       }
//     };
 
//     fetchLotDetails();
//   }, [lot_id]);

//   const handleDelete = async (productId) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       try {
//         const response = await axios.delete(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/products/delete/${productId}`);

//         if (response.status === 200) {
//           setProducts((prevProducts) =>
//             prevProducts.filter((product) => product.id !== productId)
//           );
//           alert("Product deleted successfully!");
//         }
//       } catch (error) {
//         console.error("Error deleting product:", error);
//         alert("There was an error deleting the product.");
//       }
//     }
//   };

//   const handleUpdateWeights = async () => {
 
//     console.log(bulkWeightAfter,bulkWeightBefore,"oooooooooooo")
//     const payload = {
//       lot_id: Number(lot_id),
//       bulk_weight_before: parseFloat(bulkWeightBefore),
//       bulk_after_weight: parseFloat(bulkWeightAfter),
//     };

//     try {
//       const response = await axios.post( `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/lot/modify_lot`,payload);
 
//       if (response.status === 200) {

//         console.log("dataaa", response.data.result);

//         const value = response.data.result;
//         setBulkWeightAfter(value.bulk_after_weight);
//         setBulkWeightBefore(value.bulk_weight_before);
 
//         alert("Bulk weights updated successfully!");
//       }
//     } catch (error) {
//       console.error("Error updating bulk weights:", error);
//       alert("There was an error updating the bulk weights.");
//     }
//   };
 
//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/products/getAll/${lot_id}`);
//       setProducts(response.data);
//     } catch (error) {
//       console.error("Failed to fetch products:", error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [lot_id]);

//   const handleCalculate = async () => {
//     if (!bulkWeightBefore || !bulkWeightAfter) {
//       alert("Please enter both Bulk Weight Before and Bulk Weight After.");
//       return;
//     }
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/products/calculate/${lot_id}` 
//       );
//       if (response.status === 200) {
//         const calculatedProducts = response.data.products;
//         setProducts(calculatedProducts);
//         const firstProduct = calculatedProducts[0];
//         setBeforeWeight(firstProduct.before_weight || "");
//         setAfterWeight(firstProduct.after_weight || "");
//         setDifference(firstProduct.difference?.toFixed(3) || "");
//         setAdjustment(firstProduct.adjustment?.toFixed(3) || "");
//         setFinalWeight(firstProduct.final_weight?.toFixed(2) || "");
//         setProductNumber(firstProduct.product_number || "");
//         setStatus(firstProduct.product_type || "");
//         setProductWeight(firstProduct.barcode_weight || "");
//         alert("Calculated values updated successfully!");
//       }
//     } catch (error) {
//       console.error("Error calculating adjustments:", error);
//       alert("There was an error calculating the adjustments.");
//     }
//   };
 
//   const handleSave = async () => {

//     // if (!beforeWeight || !afterWeight || !productNumber || !difference || !adjustment || !finalWeight) {
//       if (!beforeWeight && !afterWeight && !productNumber && !productWeight) {
//       alert("Please fill in all the required fields before saving.");
//       return;
//     }


  

//     try {
//       const payload = {
//         tag_number: lotNumber,
//         before_weight: beforeWeight || null,
//         after_weight: afterWeight || null,
//         barcode_weight: productWeight || null,
//         difference: difference || null,  
//         adjustment: adjustment || null, 
//         final_weight: finalWeight || null,  
//         product_number: productNumber || null,  
    
//         lot_id: Number(lot_id),
//       };

//       const response = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/products/create`,payload);

//       if (response.status === 200) {
//         setProducts((prevProducts) => [
//           ...prevProducts,
//           response.data.newProduct,
//         ]);
//         alert("Product saved successfully!");
//         closeAddItemsPopup();
//         window.location.reload()
//       }
//     } catch (error) {
//       console.error("Error saving product:", error);
//       alert("There was an error saving the product.");
//     }
//   };




//   const filterProducts = products.filter((item) => {
//     if (filterOpt === "all") {
//       return true;
//     } else if (filterOpt === "active") {
//       return item.product_type === "active";
//     } else if (filterOpt === "sold") {
//       return item.product_type === "sold";
//     } 
//   });
 
//   const totalBeforeWeight = filterProducts.reduce((acc, product) => acc + parseFloat(product.before_weight || 0), 0).toFixed(3);
//   const totalAfterWeight = filterProducts.reduce((acc, product) => acc + parseFloat(product.after_weight || 0), 0).toFixed(3);
//   const totalDifference = filterProducts.reduce((acc, product) => acc + parseFloat(product.difference || 0), 0).toFixed(3);
//   const totalAdjustment = filterProducts.reduce((acc, product) => acc + parseFloat(product.adjustment || 0), 0).toFixed(3);
//   const totalFinalWeight = filterProducts.reduce((acc, product) => acc + parseFloat(product.final_weight || 0), 0).toFixed(3);
 
// useEffect(() => {
//   const handleBarcodeScan = (e) => {
//     setShowBarcode((prevData) => prevData + e.key);
//     if (e.key === "Enter") {
//       console.log("Scanned Barcode:", showBarcode);
//       setShowBarcode("");
//     }
//   };
 
//   window.addEventListener("keydown", handleBarcodeScan);
//   return () => {
//     window.removeEventListener("keydown", handleBarcodeScan);
//   };
// }, [showBarcode]);
 
//   return (
//     <>
//     <div className="background">  
//       <Navbarr />
//       <div className="add-items">
//         <button onClick={handleAddItems}>Add Items</button>
//         <select style={{marginLeft:"1rem",height: "1.5rem", width: "4rem" }}
//           id="cars"
//           name="cars"
//           value={filterOpt}
//           onChange={(e) => setFilterOpt(e.target.value)}
//         >
//           <option value="all">All</option>
//           <option value="active">Active</option>
//           <option value="sold">Sold</option>
          
//         </select>
//       </div>
     
//       <div className="weight">
//         <div className="cont">
//           <label>Bulk Weight Before: </label>
//           <input
//             value={bulkWeightBefore}
//             onChange={(e) => setBulkWeightBefore(e.target.value)}/>
//         </div>
//         <div className="cont">
//           <label>Bulk Weight After: </label>
//           <input
//             value={bulkWeightAfter}
//             onChange={(e) => setBulkWeightAfter(e.target.value)} />
//         </div>
//         <div className="cont" >  <label> Difference: </label>
//       <input value={(bulkWeightAfter - bulkWeightBefore) || "-"} /></div>
//         <button className="up" onClick={handleUpdateWeights} style={{fontWeight:'bold', width:'7rem', borderRadius:'8px',fontSize:'1rem'}}>Update</button>
//       </div >
//       <div className="update">
//         <button onClick={handleCalculate}>Calculate</button> <span> </span>
//       </div>
//   <div id="page-to-pdf">
//       <div className="table-container">
//         <div className="list">List of Items</div>
//         <Table striped bordered hover className="tab">
//           <thead>
//             <tr>
//               <th>S.No</th>
//               <th style={{width:'11rem'}}>Product Number</th>
//               <th>Before Weight</th>
//               <th>After Weight</th>
//               <th>Difference</th>
//               <th>Adjustment</th>
//               <th>Final weight</th>
//               <th>Barcode Weight</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filterProducts.map((product, index) => (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>
//                   <input value={transform_text(product.product_number)} readOnly />
//                 </td>
//                 <td>
//                   <input value={product.before_weight || ""} readOnly />
//                 </td>
//                 <td>
//                   <input value={product.after_weight || ""} readOnly />
//                 </td>
//                 <td>
//                   <input
//                     value={product.difference?.toFixed(3) || ""}
//                     readOnly
//                   />
//                 </td>
//                 <td>
//                   <input
//                     value={product.adjustment?.toFixed(3) || ""}
//                     readOnly
//                   />
//                 </td>
//                 <td>
//                   <input
//                     value={product.final_weight?.toFixed(3) || ""}
//                     readOnly
//                   />
//                 </td>
//                 <td>
//                   <input value={product.barcode_weight==="null" ?"" :product.barcode_weight  || ""} readOnly />
//                 </td>
//                 <td>
//                   <input style={{fontSize:'0.95rem'}} value={product.product_type || ""} readOnly />
//                 </td>
//                 <td>
//                   <div className="icon">
//                      <FontAwesomeIcon
//                       icon={faEye}
//                       onClick={() => openPopup(product.id)}
//                     />
//                     <WeightFormPopup
//                       showPopup={showPopup.id === product.id ? true : false}
//                       closePopup={closePopup}
//                       productId={product.id}
//                       product={product}
//                       productInfo={{
//                         before_weight: product.before_weight,
//                         after_weight: product.after_weight,
//                         barcode_weight: product.barcode_weight,
//                         difference:product.difference,
//                         adjustment:product.adjustment,
//                         final_weight:product.final_weight,
//                         product_number:product.product_number,
                        
//                         }}/>
//                     <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(product.id)} />
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//           <tfoot>
//             <tr>
//               <td colSpan="2">
//                 <b>Total Weight = </b>
//               </td>
//               <td>
//                 <b>{totalBeforeWeight}</b>
//               </td>
//               <td>
//                 <b>{totalAfterWeight}</b>
//               </td>
//               <td>
//                 <b>{totalDifference}</b>
//               </td>
//               <td>
//                 <b>{totalAdjustment}</b>
//               </td>
//               <td>
//                 <b>{totalFinalWeight}</b>
//               </td>
//               <td></td>
//               <td></td>
//               <td></td>
//             </tr>
//           </tfoot>   
//         </Table> 
//       </div>
//       </div>
//       <button style={{  marginTop:'1rem' ,marginLeft:'4rem', height:'2rem', width:'8rem', fontWeight:'bold', fontSize:'1rem', borderRadius:'5px',backgroundColor:'rgb(36, 36, 66)',color:'white' }}
//         onClick={exportPDF}>Export as PDF </button>
//       {showAddItemsPopup && (
//         <div className="popup-1">
//           <div className="popup-content">
//             <div className="close">
//               <b onClick={closeAddItemsPopup} className="close-button">
//                 <FontAwesomeIcon icon={faXmark} />
//               </b>
//             </div>
//             <form className="in-position">
//               <div>
//                 <label>Lot Number:</label>
//                 <input
//                   value={lotNumber}
//                   onChange={(e) => setLotNumber(e.target.value)}
//                   readOnly
//                   onKeyDown={(e) => handleKeyDown(e, afterWeightRef)}  />
//               </div>
//               <div>
//                 <label>Before Weight:</label>
//                 <input
//                   value={beforeWeight}
//                   onChange={(e) => setBeforeWeight(e.target.value)}
//                   onKeyDown={(e) => handleKeyDown(e, afterWeightRef)} />
//               </div>
//               <div>
//                 <label>After Weight:</label>
//                 <input
//                   value={afterWeight}
//                   onChange={(e) => setAfterWeight(e.target.value)}
//                   ref={afterWeightRef}
//                   onKeyDown={(e) => handleKeyDown(e, differenceRef)}/>
//               </div>
//               <div>
//                 <label>Difference:</label>
//                 <input
//                   value={difference}
//                   onChange={(e) => setDifference(e.target.value)}
//                   ref={differenceRef}
//                   onKeyDown={(e) => handleKeyDown(e, adjustmentRef)}  />
//               </div>
//               <div>
//                 <label>Adjustment:</label>
//                 <input
//                   value={adjustment}
//                   onChange={(e) => setAdjustment(e.target.value)}
//                   ref={adjustmentRef}
//                   onKeyDown={(e) => handleKeyDown(e, finalWeightRef)}  />
//               </div>
//               <div>
//                 <label>Final Weight:</label>
//                 <input
//                   value={finalWeight}
//                   onChange={(e) => setFinalWeight(e.target.value)}
//                   ref={finalWeightRef}
//                   onKeyDown={(e) => handleKeyDown(e, productNumberRef)}  />
//               </div>
//               <div>
//                 <label>Product Number:</label>
//                 <input
//                   value={productNumber}
//                   onChange={(e) => setProductNumber(e.target.value)}
//                   ref={productNumberRef}
//                   onKeyDown={(e) => handleKeyDown(e, productWeightRef)}  />
//               </div>
//               <div>
//                 <label>Barcode Weight:</label>
//                 <input
//                   value={productWeight}
//                   onChange={(e) => setProductWeight(e.target.value)}
//                   ref={productWeightRef} />
//               </div>
//             </form>
//             <div className="save-button">
//               <button onClick={handleSave}>Save</button> </div>
//           </div>
//         </div>
//       )}
//       </div>
//     </>
//   );
// };
// export default Products;








import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import Table from "react-bootstrap/Table";
import { useParams, useLocation } from "react-router-dom";
import "../Products/Products.css";
import WeightFormPopup from "./View";
import Navbarr from "../Navbarr/Navbarr";
import { transform_text } from "../utils";
import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import "jspdf-autotable";

const Products = () => {
  const { lot_id } = useParams();
  const location = useLocation();
  const [showAddItemsPopup, setShowAddItemsPopup] = useState(false);
  const [products, setProducts] = useState([]);
  const [showBarcode, setShowBarcode] = useState(false);
  const searchParams = new URLSearchParams(location.search);
  const lotnameQuery = searchParams.get("lotname");
  const [lotNumber, setLotNumber] = useState(lotnameQuery || lot_id || "");
  const [bulkWeightBefore, setBulkWeightBefore] = useState("");
  const [bulkWeightAfter, setBulkWeightAfter] = useState("");
  const [beforeWeight, setBeforeWeight] = useState("");
  const [afterWeight, setAfterWeight] = useState("");
  const [productNumber, setProductNumber] = useState("");
  const [productWeight, setProductWeight] = useState("");
  const [finalWeight, setFinalWeight] = useState("");
  const [difference, setDifference] = useState("");
  const [adjustment, setAdjustment] = useState("");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [status, setStatus] = useState("");
  const [showPopup, setShowPopup] = useState({ id: null, value: false });
  const afterWeightRef = useRef(null);
  const differenceRef = useRef(null);
  const adjustmentRef = useRef(null);
  const finalWeightRef = useRef(null);
  const productNumberRef = useRef(null);
  const productWeightRef = useRef(null);
  const [filterOpt, setFilterOpt] = useState("all");

    const exportPDF = () => {
    const doc = new jsPDF();
    const tableHeaders = ["S.No", "Product Number", "Before Weight", "After Weight", "Difference", "Adjustment", "Enamel Weight", "Final Weight"];
    const tableData = products.map((product, index) => [
      index + 1,
      transform_text(product.product_number),
      product.before_weight,
      product.after_weight,
      product.difference,
      product.adjustment,
      product.final_weight,
      product.barcode_weight,
    ]);
    const totalBeforeWeight = filterProducts.reduce((acc, product) => acc + parseFloat(product.before_weight || 0), 0).toFixed(3);
    const totalAfterWeight = filterProducts.reduce((acc, product) => acc + parseFloat(product.after_weight || 0), 0).toFixed(3);
    const totalDifference = filterProducts.reduce((acc, product) => acc + parseFloat(product.difference || 0), 0).toFixed(3);
    const totalAdjustment = filterProducts.reduce((acc, product) => acc + parseFloat(product.adjustment || 0), 0).toFixed(3);
    const totalFinalWeight = filterProducts.reduce((acc, product) => acc + parseFloat(product.final_weight || 0), 0).toFixed(3);
    const totalBarcodeWeight = filterProducts.reduce((acc, product) => acc + parseFloat(product.barcode_weight || 0), 0).toFixed(3);

    const footerData = [
      ['', 'Total Weight =', totalBeforeWeight, totalAfterWeight, totalDifference, totalAdjustment, totalFinalWeight, totalBarcodeWeight]
    ];
  
    doc.autoTable({
      head: [tableHeaders],
      body: [...tableData, ...footerData], 
      theme: 'grid',
      margin: { top: 13 },
      styles: { fontSize: 10, cellPadding: 2 },
      headStyles: { fillColor: [36, 36, 66], halign: 'center' },
      bodyStyles: { fillColor: [255, 255, 255], halign: 'center' },
      columnStyles: {
        0: { halign: 'center' }, 
        1: { halign: 'center' }, 
        2: { halign: 'center' },  
        3: { halign: 'center' },  
        4: { halign: 'center' },  
        5: { halign: 'center' },  
        6: { halign: 'center' },  
        7: { halign: 'center' },  
      }
    });

    doc.save("product_details.pdf");
  };

  
  const handleKeyDown = (e, nextField) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextField.current.focus();
    }
  };
 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/products/getAll/${lot_id}`);
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, [lot_id]);

  const handleAddItems = () => {
    setShowAddItemsPopup(true);
  };

  const openPopup = (id) => {
    setShowPopup({ id });
  };
  const handleSaveee = (productId) => {
    setSelectedProductId(productId);
    setShowPopup(true);
  };
  const closePopup = () => {
    setShowPopup({ id: null });
  };
  const closeAddItemsPopup = () => {
    setShowAddItemsPopup(false);
  };

  useEffect(() => {
    const fetchLotDetails = async () => {
      console.log("Fetching lot details...");
      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/lot/lot_data`,
          {
            lot_id,
          }
        );
        const lotData = response.data;
        console.log("Fetched Lot Data:", lotData);
        if (lotData) {
          setBulkWeightBefore(lotData.result.bulk_weight_before || "");
          setBulkWeightAfter(lotData.result.bulk_after_weight || "");
        }
      } catch (error) {
        console.error("Failed to fetch lot details:", error);

      }
    };
 
    fetchLotDetails();
  }, [lot_id]);

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await axios.delete(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/products/delete/${productId}`);

        if (response.status === 200) {
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId)
          );
          alert("Product deleted successfully!");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("There was an error deleting the product.");
      }
    }
  };

  const handleUpdateWeights = async () => {
 
    console.log(bulkWeightAfter,bulkWeightBefore,"oooooooooooo")
    const payload = {
      lot_id: Number(lot_id),
      bulk_weight_before: parseFloat(bulkWeightBefore),
      bulk_after_weight: parseFloat(bulkWeightAfter),
    };

    try {
      const response = await axios.post( `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/lot/modify_lot`,payload);
 
      if (response.status === 200) {

        console.log("dataaa", response.data.result);

        const value = response.data.result;
        setBulkWeightAfter(value.bulk_after_weight);
        setBulkWeightBefore(value.bulk_weight_before);
 
        alert("Bulk weights updated successfully!");
      }
    } catch (error) {
      console.error("Error updating bulk weights:", error);
      alert("There was an error updating the bulk weights.");
    }
  };
 
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/products/getAll/${lot_id}`);
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [lot_id]);

  const handleCalculate = async () => {
    if (!bulkWeightBefore || !bulkWeightAfter) {
      alert("Please enter both Bulk Weight Before and Bulk Weight After.");
      return;
    }
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/products/calculate/${lot_id}` 
      );
      if (response.status === 200) {
        const calculatedProducts = response.data.products;
        setProducts(calculatedProducts);
        const firstProduct = calculatedProducts[0];
        setBeforeWeight(firstProduct.before_weight || "");
        setAfterWeight(firstProduct.after_weight || "");
        setDifference(firstProduct.difference?.toFixed(3) || "");
        setAdjustment(firstProduct.adjustment?.toFixed(3) || "");
        setFinalWeight(firstProduct.final_weight?.toFixed(2) || "");
        setProductNumber(firstProduct.product_number || "");
        setStatus(firstProduct.product_type || "");
        setProductWeight(firstProduct.barcode_weight || "");
        alert("Calculated values updated successfully!");
      }
    } catch (error) {
      console.error("Error calculating adjustments:", error);
      alert("There was an error calculating the adjustments.");
    }
  };
 
  const handleSave = async () => {

    // if (!beforeWeight || !afterWeight || !productNumber || !difference || !adjustment || !finalWeight) {
      if (!beforeWeight && !afterWeight && !productNumber && !productWeight) {
      alert("Please fill in all the required fields before saving.");
      return;
    }


  

    try {
      const payload = {
        tag_number: lotNumber,
        before_weight: beforeWeight || null,
        after_weight: afterWeight || null,
        barcode_weight: productWeight || null,
        difference: difference || null,  
        adjustment: adjustment || null, 
        final_weight: finalWeight || null,  
        product_number: productNumber || null,  
    
        lot_id: Number(lot_id),
      };

      const response = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/products/create`,payload);

      if (response.status === 200) {
        setProducts((prevProducts) => [
          ...prevProducts,
          response.data.newProduct,
        ]);
        alert("Product saved successfully!");
        closeAddItemsPopup();
        window.location.reload()
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert("There was an error saving the product.");
    }
  };




  const filterProducts = products.filter((item) => {
    if (filterOpt === "all") {
      return true;
    } else if (filterOpt === "active") {
      return item.product_type === "active";
    } else if (filterOpt === "sold") {
      return item.product_type === "sold";
    } 
  });


  

 
  const totalBeforeWeight = filterProducts.reduce((acc, product) => acc + parseFloat(product.before_weight || 0), 0).toFixed(3);
  const totalAfterWeight = filterProducts.reduce((acc, product) => acc + parseFloat(product.after_weight || 0), 0).toFixed(3);
  const totalDifference = filterProducts.reduce((acc, product) => acc + parseFloat(product.difference || 0), 0).toFixed(3);
  const totalAdjustment = filterProducts.reduce((acc, product) => acc + parseFloat(product.adjustment || 0), 0).toFixed(3);
  const totalFinalWeight = filterProducts.reduce((acc, product) => acc + parseFloat(product.final_weight || 0), 0).toFixed(3);
  const totalBarcodeWeight = filterProducts.reduce((acc, product) => acc + parseFloat(product.barcode_weight || 0), 0).toFixed(3);
 
useEffect(() => {
  const handleBarcodeScan = (e) => {
    setShowBarcode((prevData) => prevData + e.key);
    if (e.key === "Enter") {
      console.log("Scanned Barcode:", showBarcode);
      setShowBarcode("");
    }
  };
 
  window.addEventListener("keydown", handleBarcodeScan);
  return () => {
    window.removeEventListener("keydown", handleBarcodeScan);
  };
}, [showBarcode]);
 
  return (
    <>
    <div className="background">  
      <Navbarr />
      <div className="add-items">
        <button onClick={handleAddItems}>Add Items</button>
        <select style={{marginLeft:"1rem",height: "1.5rem", width: "4rem" }}
          id="cars"
          name="cars"
          value={filterOpt}
          onChange={(e) => setFilterOpt(e.target.value)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="sold">Sold</option>
          
        </select>
      </div>
     
      <div className="weight">
        <div className="cont">
          <label>Bulk Weight Before: </label>
          <input
            value={bulkWeightBefore}
            onChange={(e) => setBulkWeightBefore(e.target.value)}/>
        </div>
        <div className="cont">
          <label>Bulk Weight After: </label>
          <input
            value={bulkWeightAfter}
            onChange={(e) => setBulkWeightAfter(e.target.value)} />
        </div>
        <div className="cont" >  <label> Difference: </label>
      <input value={(bulkWeightAfter - bulkWeightBefore) || "-"} /></div>
        <button className="up" onClick={handleUpdateWeights} style={{fontWeight:'bold', width:'7rem', borderRadius:'8px',fontSize:'1rem'}}>Update</button>
      </div >
      <div className="update">
        <button onClick={handleCalculate}>Calculate</button> <span> </span>
      </div>
  <div id="page-to-pdf">
      <div className="table-container">
        <div className="list">List of Items</div>
        <Table striped bordered hover className="tab">
          <thead>
            <tr>
              <th>S.No</th>
              <th style={{width:'11rem'}}>Product Number</th>
              <th>Before Weight</th>
              <th>After Weight</th>
              <th>Difference</th>
              <th>Adjustment</th>
              <th>Enamel weight</th>
              <th>Final Weight</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filterProducts.map((product, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <input value={transform_text(product.product_number)} readOnly />
                </td>
                <td>
                  <input value={product.before_weight || ""} readOnly />
                </td>
                <td>
                  <input value={product.after_weight || ""} readOnly />
                </td>
                <td>
                  <input
                    value={product.difference?.toFixed(3) || ""}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    value={product.adjustment?.toFixed(3) || ""}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    value={product.final_weight?.toFixed(3) || ""}
                    readOnly
                  />
                </td>
                <td>
                  <input value={product.barcode_weight==="null" ?"" :product.barcode_weight  || ""} readOnly />
                </td>
                <td>
                  <input style={{fontSize:'0.95rem'}} value={product.product_type || ""} readOnly />
                </td>
                <td>
                  <div className="icon">
                     <FontAwesomeIcon
                      icon={faEye}
                      onClick={() => openPopup(product.id)}
                    />
                    <WeightFormPopup
                      showPopup={showPopup.id === product.id ? true : false}
                      closePopup={closePopup}
                      productId={product.id}
                      product={product}
                      productInfo={{
                        before_weight: product.before_weight,
                        after_weight: product.after_weight,
                        barcode_weight: product.barcode_weight,
                        difference:product.difference,
                        adjustment:product.adjustment,
                        final_weight:product.final_weight,
                        product_number:product.product_number,
                        
                        }}/>
                    <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(product.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2">
                <b>Total Weight = </b>
              </td>
              <td>
                <b>{totalBeforeWeight}</b>
              </td>
              <td>
                <b>{totalAfterWeight}</b>
              </td>
              <td>
                <b>{totalDifference}</b>
              </td>
              <td>
                <b>{totalAdjustment}</b>
              </td>
              <td>
                <b>{totalFinalWeight}</b>
              </td>
              <td>
                <b>{totalBarcodeWeight}</b>
              </td>
              <td></td>
              <td></td>
            </tr>
          </tfoot>   
        </Table> 
      </div>
      </div>
      <button style={{  marginTop:'1rem' ,marginLeft:'4rem', height:'2rem', width:'8rem', fontWeight:'bold', fontSize:'1rem', borderRadius:'5px',backgroundColor:'rgb(36, 36, 66)',color:'white' }}
        onClick={exportPDF}>Export as PDF </button>
      {showAddItemsPopup && (
        <div className="popup-1">
          <div className="popup-content">
            <div className="close">
              <b onClick={closeAddItemsPopup} className="close-button">
                <FontAwesomeIcon icon={faXmark} />
              </b>
            </div>
            <form className="in-position">
              <div>
                <label>Lot Number:</label>
                <input
                  value={lotNumber}
                  onChange={(e) => setLotNumber(e.target.value)}
                  readOnly
                  onKeyDown={(e) => handleKeyDown(e, afterWeightRef)}  />
              </div>
              <div>
                <label>Before Weight:</label>
                <input
                  value={beforeWeight}
                  onChange={(e) => setBeforeWeight(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, afterWeightRef)} />
              </div>
              <div>
                <label>After Weight:</label>
                <input
                  value={afterWeight}
                  onChange={(e) => setAfterWeight(e.target.value)}
                  ref={afterWeightRef}
                  onKeyDown={(e) => handleKeyDown(e, differenceRef)}/>
              </div>
              <div>
                <label>Difference:</label>
                <input
                  value={difference}
                  onChange={(e) => setDifference(e.target.value)}
                  ref={differenceRef}
                  onKeyDown={(e) => handleKeyDown(e, adjustmentRef)}  />
              </div>
              <div>
                <label>Adjustment:</label>
                <input
                  value={adjustment}
                  onChange={(e) => setAdjustment(e.target.value)}
                  ref={adjustmentRef}
                  onKeyDown={(e) => handleKeyDown(e, finalWeightRef)}  />
              </div>
              <div>
                <label>Enamel Weight:</label>
                <input
                  value={finalWeight}
                  onChange={(e) => setFinalWeight(e.target.value)}
                  ref={finalWeightRef}
                  onKeyDown={(e) => handleKeyDown(e, productNumberRef)}  />
              </div>
              <div>
                <label>Product Number:</label>
                <input
                  value={productNumber}
                  onChange={(e) => setProductNumber(e.target.value)}
                  ref={productNumberRef}
                  onKeyDown={(e) => handleKeyDown(e, productWeightRef)}  />
              </div>
              <div>
                <label>Final Weight:</label>
                <input
                  value={productWeight}
                  onChange={(e) => setProductWeight(e.target.value)}
                  ref={productWeightRef} />
              </div>
            </form>
            <div className="save-button">
              <button onClick={handleSave}>Save</button> </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
};
export default Products;

