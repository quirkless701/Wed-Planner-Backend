import React, { useEffect } from 'react';
import { Layout, Menu, InputNumber } from 'antd';

const { Sider, Content } = Layout;

let typeMenu = {
	key: `type`,
	label: `Type`,
	children: [
		{
			key: `all`,
			label: `All`,
		},
		{
			key: `food`,
			label: `Food`,
		},
		{
			key: `floral`,
			label: `Floral`,
		}
	]
};
let sortMenu = {
	key: `sort`,
	label: `Sort by`,
	children: [
		{
			key: `relevance`,
			label: `Relevance`,
		},
		{
			key: `pricehigh`,
			label: `Price (high)`,
		},
		{
			key: `pricelow`,
			label: `Price (low)`,
		},
		{
			key: `reviewshigh`,
			label: `Reviews (high)`,
		},
		{
			key: `reviewslow`,
			label: `Reviews (low)`,
		}
	]
};

const Vendors = () => {
	const googleMapsApiKey = process.env.REACT_APP_GOOGLE_KEY; 
	let map;

	const handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
		infoWindow.setPosition(pos);
		infoWindow.setContent(
		  browserHasGeolocation
			? "Error: The Geolocation service failed."
			: "Error: Your browser doesn't support geolocation."
		);
		infoWindow.open(map);
	};

	const initMap = function () {
		map = new window.google.maps.Map(document.getElementById("map"), {
		  center: { lat: 37.7749, lng: -122.4194 },
		  zoom: 8,
		});
		const infoWindow = new window.google.maps.InfoWindow(),
			  locationButton = document.createElement("button");
		locationButton.textContent = "Pan to Current Location";
		locationButton.classList.add("custom-map-control-button");
		map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(
		  locationButton
		);
		locationButton.addEventListener("click", () => {
		  if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
			  (position) => {
				const pos = {
				  lat: position.coords.latitude,
				  lng: position.coords.longitude,
				};
				infoWindow.setPosition(pos);
				infoWindow.setContent("Location found.");
				infoWindow.open(map);
				console.log(pos);
				map.setCenter(pos);
			  },
			  () => {
				handleLocationError(true, infoWindow, map.getCenter());
			  }
			);
		  } else {
			handleLocationError(false, infoWindow, map.getCenter());
		  }
		});
	};

	const onChange = (value) => {
		console.log(value);
	};

	useEffect(() => {
		const script = document.createElement("script");
		script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initMap`;
		script.async = true;
		document.body.appendChild(script);
		window.initMap = initMap;
	});

	return (
		<>
			<div className="hero">
				<h1 className="text-gradient sublogo">Event Partners </h1>
            	<img src="robot.png" width="200px" alt="Robot wearing a veil"></img>
				<h3 className="text-gradient description">&ldquo;Explore a curated selection of top-tier wedding vendors ready to bring your vision to life. From skilled photographers capturing moments to talented florists crafting stunning arrangements, connect with the finest professionals to make your wedding day extraordinary.&rdquo;</h3>
			</div>
			<Layout className="main-content">
				<Sider className="sidebar">
					<Menu mode="inline" defaultSelectedKeys={['1']} items={[typeMenu, sortMenu]} />
					<InputNumber min={0} addonBefore="Min:" addonAfter="$" onChange={onChange} />
					<InputNumber min={0} addonBefore="Max:" addonAfter="$" onChange={onChange} />
				</Sider>
				<Content className="content">
					<h2>Vendor List</h2>
					<div id="map"></div>
				</Content>
			</Layout>
		</>
	);
};

export default Vendors;