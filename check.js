var Curl = require('node-libcurl').Curl;
const fs = require('fs');
const args = process.argv.slice(2);
const urls = [
	'/how-you-can-help/emergencies/emergency-health-unit',
	'/content/stc/gb/en/misc/accessibility',
	'/content/stc/gb/en/home/about-us/accountability-and-transparency/supporter-promise',
	'/about-us/who-we-are/annual-report-2017--save-the-children-uk',
	'/about-us/who-we-work-with/special-events/summer-in-the-city-2015 ',
	'/what-we-do/policy-and-practice/our-featured-reports/fighting-for-breath-country-briefings',
	'/how-you-can-help/emergencies.html',
	'/content/stc/gb/en/misc/terms-conditions-of-this-website',
	'/privacy',
	'/content/stc/gb/en/home/about-us/key-reports',
	'/content/stc/gb/en/home/about-us/contact-us',
	'/content/stc/gb/en/misc/privacy-cookie-policy',
	'/about-us/who-we-work-with/special-events/a-night-of-hits',
	'/content/dam/global/reports/modern-slavery-statement-2017.pdf',
	'/sites/default/files/images/Halfway_There.pdf',
	'/reducing-the-risk-of-disaster',
	'/early-years',
	'/about-us/history',
	'/about-us/where-we-work',
	'/about-us/where-we-work/united-kingdom',
	'/about-us/what-we-do',
	'/get-involved',
	'/resources/online-library/further-faster-fairer',
	'/muddy-puddle-walk',
	'/get-involved/events-fundraising',
	'/resources/online-library/nowhere-safe-yemens-children',
	'/content/stc/gb/en/misc/gdpr-suppressions',
	'/resources/online-library/lighting-young-brains',
	'/about-us/who-we-work-with/corporate-partnerships/rb',
	'/about-us/being-accountable/supporter-promise',
	'/about-us/being-accountable',
	'/content/stc/gb/en/misc/privacy-cookie-policy.html',
	'/content/stc/gb/en/misc/gdpr-suppressions.html',
	'/supporter-promise',
	'/about-us/accountability'
];
const domain = args[0];
var statusCodes = [];

process.on('unhandledRejection', error => {
	// Prints "unhandledRejection woops!"
	console.log('unhandledRejection', error.test);
});

function doCurl(url) {
	const curl = new Curl();
	return new Promise((resolve, reject) => {
		var headerList = [];
		curl.setOpt('URL', url);
		curl.setOpt('FOLLOWLOCATION', true);

		curl.on('end', function(statusCode, body, headers) {
			for (const header of headers) {
				const loc = header.Location || '';
				headerList.push({ from: loc, status: header.result.code });
			}
			curl.close();
			resolve(headerList);
		});

		curl.on('error', function(err) {
			console.log('error man');
			curl.close();
			reject(new Error(err));
		});

		curl.perform();
	}).catch(function(err) {
		console.error(err);
		curl.close();
	});
}

async function init() {
	for (const url of urls) {
		console.log(`Curling ${domain}${url}`);
		var headers = await doCurl(`${domain}${url}`);
		statusCodes.push(JSON.stringify({ url: url, redirects: headers }));
	}

	writeFile(statusCodes);
}

function writeFile(data) {
	console.log('Writing file!');
	const dataToWrite = `[${data}]`;
	fs.writeFile('redirects.json', dataToWrite, function(err) {
		if (err) {
			return console.err(err);
		}

		console.log('The file was written!');
	});
}

init();
