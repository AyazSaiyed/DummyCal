// pages/about.js

import Layout from "../components/Layout";
import Card from "../components/Card";

const About = () => <Layout>
    <div className="container">
        <Card 
            title="About"
            content="About Page."
        ></Card>
    </div>
</Layout>;

export default About;