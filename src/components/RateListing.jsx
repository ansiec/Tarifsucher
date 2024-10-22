import React from "react";
import ListItemIncluded from "./ListItemIncluded";
import getEuroBetrag from "../utils/getEuroBetrag";
import RateAngebotButton from "./RateAngebotButton";

const RateListing = ({ rate, id }) => {
  return (
    <>
      <div className="bg-white dark:bg-gray-800">
        <div className="relative pt-4">
          <div className="absolute inset-0 h-1/3 bg-gray-100 dark:bg-gray-700"></div>
          <div className="relative max-w-5xl mx-auto px-2 sm:px-4 lg:px-6">
            <div className="max-w-md mx-auto rounded-md shadow-md overflow-hidden lg:max-w-none lg:flex">
              <div className="py-8 px-6 text-center bg-white dark:bg-gray-900 lg:flex-grow-0 lg:flex lg:flex-col lg:justify-center lg:p min-w-48">
                <img
                  src={rate.providerSVGPath}
                  className="max-w-full h-auto"
                  title={rate.providerName}
                  alt={rate.providerName}
                ></img>
              </div>

              <div className="flex-1 bg-white dark:bg-gray-900 px-4 py-6 lg:p-8">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white sm:text-3xl">
                  {rate.rateName}
                </h3>

                <p className="mt-2">
                  <span>
                    Grundpreis:{" "}
                    <span className="font-semibold">
                      {getEuroBetrag(rate.basePriceMonth)}
                    </span>{" "}
                    pro Monat
                  </span>
                  <br></br>
                  <span>
                    Arbeitspreis HT:{" "}
                    <span className="font-semibold">
                      {getEuroBetrag(rate.workPrice)}
                    </span>{" "}
                    Cent / kWh
                  </span>
                </p>

                <div className="mt-8">
                  <div className="flex items-center">
                    <h4 className="flex-shrink-0 pr-4 bg-white dark:bg-gray-900 text-sm tracking-wider font-semibold uppercase text-rose-600">
                      Vorteile
                    </h4>
                    <div className="flex-1 border-t-2 border-gray-200 dark:border-gray-600"></div>
                  </div>
                  <ul
                    id={id + "-ul"}
                    role="list"
                    className="mt-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5"
                  >
                    {rate.optEco && (
                      <ListItemIncluded id={id + "-optEco"}>
                        Ökostrom
                      </ListItemIncluded>
                    )}

                    {rate.providerChangeFast && (
                      <ListItemIncluded id={id + "-providerChangeFast"}>
                        schneller Wechsel
                      </ListItemIncluded>
                    )}

                    {rate.optBonusInstant > 0 && (
                      <ListItemIncluded id={id + "-optBonusInstant"}>
                        {getEuroBetrag(rate.optBonusInstant)} Sofortbonus
                        inklusive
                      </ListItemIncluded>
                    )}

                    <ListItemIncluded id={id + "-savingPerYear"}>
                      {getEuroBetrag(-1 * rate.savingPerYear)} pro Jahr gespart
                    </ListItemIncluded>
                  </ul>
                </div>
              </div>
              <div className="py-8 px-6 text-center bg-gray-50 dark:bg-gray-900 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
                <div className="mt-4 flex items-center justify-center text-4xl font-extrabold text-gray-900 dark:text-white">
                  <span>{getEuroBetrag(rate.totalPriceMonth)}</span>
                </div>
                <div className="ml-3 text-xl font-medium text-gray-500 dark:text-gray-400">
                  <span>pro Monat</span>
                </div>
                <div className="text-lg mt-3 font-medium text-gray-600 dark:text-white">
                  {getEuroBetrag(rate.totalPrice)}{" "}
                  <span className="relative text-gray-600 dark:text-gray-400 text-center text-sm mb-4">
                    pro Jahr
                  </span>
                </div>
                <RateAngebotButton id={rate.rateId}>
                  Zum Angebot
                </RateAngebotButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RateListing;
