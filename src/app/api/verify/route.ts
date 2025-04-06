import { NextApiRequest, NextApiResponse } from 'next';
import { 
    getUserIdentifier, 
    SelfBackendVerifier,
    countries
} from '@selfxyz/core';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            console.log('Received verification request');
            const { proof, publicSignals } = req.body;

            if (!proof || !publicSignals) {
                console.log('Missing proof or publicSignals:', { proof, publicSignals });
                return res.status(400).json({ 
                    status: 'error',
                    message: 'Proof and publicSignals are required' 
                });
            }

            console.log('Proof structure:', {
                a: proof.a,
                b: proof.b,
                c: proof.c
            });
            console.log('Public signals:', publicSignals);

            const selectedCountries = req.headers['x-selected-countries'] as string;
            console.log('Selected countries from localStorage:', selectedCountries);
            console.log("selected countires ,,...")
            const excludedCountries = selectedCountries ? JSON.parse(selectedCountries) : [];
            console.log('Parsed excluded countries:', excludedCountries);

            const backendVerifier = new SelfBackendVerifier(
                'Self-Hotel-Booking',
                'https://c251-2a09-bac1-7420-38-00-50-18e.ngrok-free.app',
                'hex',
                true
            ).excludeCountries(...excludedCountries)
            .enablePassportNoOfacCheck()
            .enableNameAndDobOfacCheck()
            .enableNameAndYobOfacCheck();

            console.log('Starting verification with backend verifier');
            const result = await backendVerifier.verify(proof, publicSignals);
            console.log('Verification result:', result);

            if (!result) {
                console.log('Verification failed');
                return res.status(400).json({
                    status: 'error',
                    message: 'Verification failed',
                    result: false
                });
            }

            console.log('Verification successful');
            res.status(200).json({
                status: 'success',
                result: true,
                message: 'User verified successfully',
                proof,
                publicSignals
            });
        } catch (error) {
            console.error('Error processing request:', error);
            console.error('Error details:', {
                name: error instanceof Error ? error.name : 'Unknown',
                message: error instanceof Error ? error.message : 'Unknown error',
                stack: error instanceof Error ? error.stack : undefined
            });
            res.status(500).json({
                status: 'error',
                message: 'Internal server error',
                result: false,
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}