export const abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_identityVerificationHub",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_scope",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_attestationId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_boysBedPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_girlsBedPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256[]",
				"name": "_boysBeds",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "_girlsBeds",
				"type": "uint256[]"
			},
			{
				"internalType": "bool",
				"name": "_forbiddenCountriesEnabled",
				"type": "bool"
			},
			{
				"internalType": "uint256[4]",
				"name": "_forbiddenCountriesListPacked",
				"type": "uint256[4]"
			},
			{
				"internalType": "bool[3]",
				"name": "_ofacEnabled",
				"type": "bool[3]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "INSUFFICIENT_CHARCODE_LEN",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InvalidAttestationId",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InvalidFieldElement",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InvalidScope",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			}
		],
		"name": "SafeERC20FailedOperation",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bedNumber",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isBoy",
				"type": "bool"
			}
		],
		"name": "BedBooked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newBoysPrice",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newGirlsPrice",
				"type": "uint256"
			}
		],
		"name": "BedPriceUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "UserVerified",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "newBoysBeds",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "newGirlsBeds",
				"type": "uint256[]"
			}
		],
		"name": "addBeds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "bedNumber",
				"type": "uint256"
			}
		],
		"name": "bookBed",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "bookedBeds",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "boysBedPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "boysBeds",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBlockedCountries",
		"outputs": [
			{
				"internalType": "string[40]",
				"name": "",
				"type": "string[40]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBoysBeds",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getGirlsBeds",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getUserBed",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getUserGender",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "girlsBedPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "girlsBeds",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "bedNumber",
				"type": "uint256"
			}
		],
		"name": "isBedAvailable",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "isUserVerified",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "paymentToken",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "boysBedsToRemove",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "girlsBedsToRemove",
				"type": "uint256[]"
			}
		],
		"name": "removeBeds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_boysBedPrice",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_girlsBedPrice",
				"type": "uint256"
			}
		],
		"name": "updatePrices",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userGender",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userToBed",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "verifiedUsers",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256[2]",
						"name": "a",
						"type": "uint256[2]"
					},
					{
						"internalType": "uint256[2][2]",
						"name": "b",
						"type": "uint256[2][2]"
					},
					{
						"internalType": "uint256[2]",
						"name": "c",
						"type": "uint256[2]"
					},
					{
						"internalType": "uint256[21]",
						"name": "pubSignals",
						"type": "uint256[21]"
					}
				],
				"internalType": "struct IVcAndDiscloseCircuitVerifier.VcAndDiscloseProof",
				"name": "proof",
				"type": "tuple"
			}
		],
		"name": "verifySelfProof",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256[2]",
						"name": "a",
						"type": "uint256[2]"
					},
					{
						"internalType": "uint256[2][2]",
						"name": "b",
						"type": "uint256[2][2]"
					},
					{
						"internalType": "uint256[2]",
						"name": "c",
						"type": "uint256[2]"
					},
					{
						"internalType": "uint256[21]",
						"name": "pubSignals",
						"type": "uint256[21]"
					}
				],
				"internalType": "struct IVcAndDiscloseCircuitVerifier.VcAndDiscloseProof",
				"name": "proof",
				"type": "tuple"
			}
		],
		"name": "verifyUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdrawFunds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]