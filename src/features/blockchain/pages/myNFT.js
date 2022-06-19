import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Web3Modal from 'web3modal';
import { useRouter } from 'next/router';

import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json';

const marketplaceAddress = process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS;

export default function MyAssets() {
	const [nfts, setNfts] = useState([]);
	const [loadingState, setLoadingState] = useState('not-loaded');
	const router = useRouter();
	useEffect(() => {
		loadNFTs();
	}, []);
	async function loadNFTs() {
		const web3Modal = new Web3Modal({
			network: 'mainnet',
			cacheProvider: true,
		});
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();

		const marketplaceContract = new ethers.Contract(
			marketplaceAddress,
			NFTMarketplace.abi,
			signer
		);
		const data = await marketplaceContract.fetchMyNFTs();

		const items = await Promise.all(
			data.map(async (i) => {
				const tokenURI = await marketplaceContract.tokenURI(i.tokenId);
				const meta = await axios.get(tokenURI);
				let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
				let item = {
					price,
					tokenId: i.tokenId.toNumber(),
					seller: i.seller,
					owner: i.owner,
					image: meta.data.image,
					tokenURI,
				};
				return item;
			})
		);
		setNfts(items);
		setLoadingState('loaded');
	}
	function listNFT(nft) {
		console.log('nft:', nft);
		router.push(`/resell-nft?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`);
	}
	if (loadingState === 'loaded' && !nfts.length) return <h1>No NFTs owned</h1>;
	return (
		<div>
			<div>
				<div>
					{nfts.map((nft, i) => (
						<div key={i}>
							<img src={nft.image} />
							<div>
								<p>Price - {nft.price} Eth</p>
								<button onClick={() => listNFT(nft)}>List</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
