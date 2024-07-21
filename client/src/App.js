import React, { useState, useEffect } from 'react';
import getContract from './ethereum/Insurance';

const App = () => {
    const [policies, setPolicies] = useState([]);
    const [policyHolder, setPolicyHolder] = useState('');
    const [policyDetails, setPolicyDetails] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchPolicies = async () => {
        const contract = getContract();
        const policies = await contract.getPolicies();
        setPolicies(policies);
    };

    useEffect(() => {
        fetchPolicies();
    }, []);

    const addPolicy = async () => {
        setLoading(true);
        const contract = getContract();
        try {
            await contract.addPolicy(policyHolder, policyDetails);
            await fetchPolicies();
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    return (
        <div>
            <h1>Insurance Policies</h1>
            <div>
                <input
                    type="text"
                    placeholder="Policy Holder"
                    value={policyHolder}
                    onChange={(e) => setPolicyHolder(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Policy Details"
                    value={policyDetails}
                    onChange={(e) => setPolicyDetails(e.target.value)}
                />
                <button onClick={addPolicy} disabled={loading}>
                    {loading ? 'Adding...' : 'Add Policy'}
                </button>
            </div>
            <ul>
                {policies.map((policy, index) => (
                    <li key={index}>
                        <p>ID: {policy.id.toString()}</p>
                        <p>Holder: {policy.policyHolder}</p>
                        <p>Details: {policy.policyDetails}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
