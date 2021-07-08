// pages/index.js

import Layout from "../components/Layout";

const Index = () => {

    return (
      <Layout title="Caltana">
        <div className="container">
          <div className="m-auto w-75 pt-5">
            <div className="card bg-main border-0 d-flex align-items-center">
              <div className="card-body">
                <div className="m-auto text-center">
                  <h1 className="my-5">Logo</h1>
                </div>
                <div className="description text-center px-5 pb-5">
                  <p>
                    We are building the industry's first pricing and sourcing platform for outsourced services forcused initially on the commercial real estate market(CRE). Companies struggle today t get fast and accurate pricing or outsouced service (eg, janitorial, ladscaping, HCAC, etc) and currently rely on email, phone calls and spreadsheets to gather and analyze the necessary data select suppliers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
}

export default Index;