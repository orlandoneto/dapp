"use client";
import Head from "next/head";
import { useState, useEffect, useCallback } from "react";
import {
  createProduction,
  setProductName,
  setQuantityProduced,
  setDepartureDate,
  setArrivalDate,
  setAllowList,
  getProductionByNumber,
  getProductionsByCompany,
  removeAddressList,
} from "@/services/Harvesting.services";

import { GenericModal } from "../components";

export default function Defi() {
  //Modals State
  const [showModal, setShowModal] = useState(false);
  const [showModalNewProductName, setShowModalNewProductName] = useState(false);
  const [showModalSetQuantityProduced, setShowModalSetQuantityProduced] =
    useState(false);
  const [showModalSetDepartureDate, setShowModalSetDepartureDate] =
    useState(false);
  const [showModalSetArrivalDate, setShowModalSetArrivalDate] = useState(false);
  const [showModalSetNewAddress, setShowModalSetNewAddress] = useState(false);

  //Local State
  const [prodNumber, setProdNumber] = useState("");
  const [prodName, setProdName] = useState("");

  const [pdtNumber, setPdtNumber] = useState("");
  const [pdtName, setPdtName] = useState("");

  const [qtdNumber, setQtdNumber] = useState("");
  const [qtd, setQtd] = useState("");

  const [depDateNumber, setDepDateNumber] = useState("");
  const [depDate, setDepDate] = useState("");

  const [arrDateNumber, setArrDateNumber] = useState("");
  const [arrDate, setArrDate] = useState("");

  const [productionsByCompany, setProductionsByCompany] = useState([]);
  const [productionsByNumber, setProductionsByNumber] = useState("");

  const [addresses, setAddresses] = useState("");

  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");

  const handleCreateProduction = async () => {
    try {
      const result = await createProduction(prodNumber, prodName);
      setMessage("Production created successfully!");
      console.log("Production created:", result);
    } catch (error) {
      console.error(error);
      setMessage("Failed to create production: " + error.message);
    }
  };

  const handleSetProductName = async () => {
    try {
      const result = await setProductName(pdtNumber, pdtName);
      setMessage("Product Name successfully!");
      console.log("Product Name:", result);
    } catch (error) {
      console.error(error);
      setMessage("Failed to create product: " + error.message);
    }
  };

  const handleSetQuantityProduced = async () => {
    try {
      const result = await setQuantityProduced(qtdNumber, qtd);
      setMessage("Qtd Product successfully!");
      console.log("Qtd Product:", result);
    } catch (error) {
      console.error(error);
      setMessage("Failed to create qtd product: " + error.message);
    }
  };

  const handleSetDepartureDate = async () => {
    try {
      const result = await setDepartureDate(depDateNumber, depDate);
      setMessage("Departure date set successfully!");
      console.log("Departure date set:", result);
    } catch (error) {
      console.error(error);
      setMessage("Failed to set departure date: " + error.message);
    }
  };

  const handleSetArrivalDate = async () => {
    try {
      const result = await setArrivalDate(arrDateNumber, arrDate);
      setMessage("Arrival date set successfully!");
      console.log("Arrival date set:", result);
    } catch (error) {
      console.error(error);
      setMessage("Failed to set arrival date: " + error.message);
    }
  };

  const handleSetAllows = async (addresses) => {
    try {
      const listAddress = [];
      listAddress.push(addresses);
      const result = await setAllowList(listAddress);
      setResult(result);
      setMessage("Allow list set successfully!");
      console.log("Allow list set:", result);
    } catch (error) {
      console.error(error);
      setMessage("Failed to set allow list: " + error.message);
    }
  };

  useEffect(() => {
    listProductionsByCompany();
  }, []);

  const listProductionsByCompany = async () => {
    try {
      debugger
      const addressWallet = localStorage.getItem("wallet");
      const production = await getProductionsByCompany(addressWallet);
      debugger;
      setProductionsByCompany(production);
    } catch (error) {
      console.error(error);
      setMessage("Failed to fetch productions: " + error.message);
    }
  };

  const handleGetProductionsByNumber = async () => {
    try {
      const production = await getProductionByNumber(companyAddress);
      setProductionsByNumber(production);
    } catch (error) {
      console.error(error);
      setMessage("Failed to fetch productions: " + error.message);
    }
  };

  const handleRemoveAddress = async (addressToRemove) => {
    try {
      const result = await removeAddressList(addressToRemove);
      setMessage("Address removed successfully!");
      console.log("Address removed:", result);
    } catch (error) {
      console.error(error);
      setMessage("Failed to remove address: " + error.message);
    }
  };

  const TableList = useCallback(() => {
    if (productionsByCompany.length > 0) {
      return productionsByCompany.map((production, index) => (
        <tr key={index}>
          <td>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() =>
                handleSelectProduction(production.productionNumber)
              }
            >
              {production.productionName}
            </button>
          </td>
          <td>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleRemoveAddress(production.productionNumber)}
            >
              Remove
            </button>
          </td>
        </tr>
      ));
    } else if (productionsByNumber.length > 0) {
      return productionsByCompany.map((production, index) => (
        <tr key={index}>
          <td>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() =>
                handleSelectProduction(production.productionNumber)
              }
            >
              {production.productionName}
            </button>
          </td>
          <td>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleRemoveAddress(production.productionNumber)}
            >
              Remove
            </button>
          </td>
        </tr>
      ));
    } else {
      return <p>Sem resultado da pessquisa...</p>;
    }
  }, [productionsByCompany, productionsByNumber]);

  const handleSelectProduction = (e) => {
    setSelectedProduction(e.target.value);
  };
  return (
    <>
      <Head>
        <title>Web Depp AgroSync - Create</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="d-flex flex-column justify-content-center">
        <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
          Web Depp AgroSync
        </h1>
      </div>

      <br />

      <div className="d-flex justify-content-around">
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add Production
        </button>

        <button
          className="btn btn-primary"
          onClick={() => setShowModalNewProductName(true)}
        >
          Add Product Name
        </button>

        <button
          className="btn btn-primary"
          onClick={() => setShowModalSetQuantityProduced(true)}
        >
          Add Qtd Produced
        </button>

        <button
          className="btn btn-primary"
          onClick={() => setShowModalSetDepartureDate(true)}
        >
          Add Departure Date
        </button>

        <button
          className="btn btn-primary"
          onClick={() => setShowModalSetArrivalDate(true)}
        >
          Add Arrival Date
        </button>

        <button
          className="btn btn-primary"
          onClick={() => setShowModalSetNewAddress(true)}
        >
          Add Address
        </button>
      </div>

      <GenericModal
        showModal={showModal}
        setShowModal={setShowModal}
        onSubmit={handleCreateProduction}
        title="Production Name"
      >
        <div>
          <div className="mb-3">
            <label htmlFor="prodNumber" className="form-label">
              Number:
            </label>
            <input
              type="text"
              className="form-control"
              id="prodNumber"
              value={prodNumber}
              onChange={(e) => setProdNumber(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="prodName" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control col-12"
              id="prodName"
              value={prodName}
              onChange={(e) => setProdName(e.target.value)}
            />
          </div>
        </div>
      </GenericModal>

      <GenericModal
        showModal={showModalNewProductName}
        setShowModal={setShowModalNewProductName}
        onSubmit={handleSetProductName}
        title="Product Name"
      >
        <div>
          <div className="mb-3">
            <label htmlFor="pdtNumber" className="form-label">
              Number:
            </label>
            <input
              type="text"
              className="form-control"
              id="pdtNumber"
              value={pdtNumber}
              onChange={(e) => setPdtNumber(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="pdtName" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="pdtName"
              value={pdtName}
              onChange={(e) => setPdtName(e.target.value)}
            />
          </div>
        </div>
      </GenericModal>

      <GenericModal
        showModal={showModalSetQuantityProduced}
        setShowModal={setShowModalSetQuantityProduced}
        onSubmit={handleSetQuantityProduced}
        title="Quantity Produced"
      >
        <div>
          <div className="mb-3">
            <label htmlFor="qtdNumber" className="form-label">
              Number:
            </label>
            <input
              type="text"
              className="form-control"
              id="qtdNumber"
              value={qtdNumber}
              onChange={(e) => setQtdNumber(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="qtd" className="form-label">
              Quantity:
            </label>
            <input
              type="text"
              className="form-control"
              id="qtd"
              value={qtd}
              onChange={(e) => setQtd(e.target.value)}
            />
          </div>
        </div>
      </GenericModal>

      <GenericModal
        showModal={showModalSetDepartureDate}
        setShowModal={setShowModalSetDepartureDate}
        onSubmit={handleSetDepartureDate}
        title="Departure Date"
      >
        <div>
          <div className="mb-3">
            <label htmlFor="depDateNumber" className="form-label">
              Number:
            </label>
            <input
              type="text"
              className="form-control"
              id="depDateNumber"
              value={depDateNumber}
              onChange={(e) => setDepDateNumber(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="depDate" className="form-label">
              Quantity:
            </label>
            <input
              type="text"
              className="form-control"
              id="depDate"
              value={depDate}
              onChange={(e) => setDepDate(e.target.value)}
            />
          </div>
        </div>
      </GenericModal>

      <GenericModal
        showModal={showModalSetArrivalDate}
        setShowModal={setShowModalSetArrivalDate}
        onSubmit={handleSetArrivalDate}
        title="Arrival Date"
      >
        <div>
          <div className="mb-3">
            <label htmlFor="arrDateNumber" className="form-label">
              Number:
            </label>
            <input
              type="text"
              className="form-control"
              id="arrDateNumber"
              value={arrDateNumber}
              onChange={(e) => setArrDateNumber(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="arrDate" className="form-label">
              Amount:
            </label>
            <input
              type="text"
              className="form-control"
              id="arrDate"
              value={arrDate}
              onChange={(e) => setArrDate(e.target.value)}
            />
          </div>
        </div>
      </GenericModal>

      <GenericModal
        showModal={showModalSetNewAddress}
        setShowModal={setShowModalSetNewAddress}
        onSubmit={handleSetAllows}
        title="Add Address Wallet"
      >
        <div>
          <div className="mb-3">
            <label htmlFor="addresses" className="form-label">
              Address:
            </label>
            <input
              type="text"
              className="form-control"
              id="addresses"
              value={addresses}
              onChange={(e) => setAddresses(e.target.value)}
            />
          </div>
        </div>
      </GenericModal>

      <br />
      <br />
      <br />

      <div className="col-lg-4 d-flex flex-column align-items-center">
        <div className="mb-3 d-flex align-items-center">
          <label htmlFor="productionSearch" className="form-label me-2">
            Search
          </label>
          <input
            type="text"
            id="productionSearch"
            className="form-control"
            placeholder="Enter production number"
            value={productionsByNumber}
            onChange={handleGetProductionsByNumber}
          />
        </div>
        <div className="table-responsive">
          <table className="table">
            <tbody>
              <TableList />
            </tbody>
          </table>
        </div>
      </div>

      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <p className="col-md-4 mb-0 text-body-secondary">
          &copy; 2024 Web Depp AgroSync, Inc
        </p>
        <ul className="nav col-md-4 justify-content-end">
          <li className="nav-item">
            <a href="/" className="nav-link px-2 text-body-secondary">
              Create
            </a>
          </li>
          <li className="nav-item">
            <a
              href="https://github.com/web-depp"
              className="nav-link px-2 text-body-secondary"
            >
              GitHub
            </a>
          </li>
        </ul>
      </footer>
    </>
  );
}
