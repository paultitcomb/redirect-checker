var Curl = require('node-libcurl').Curl;
const fs = require('fs');
const args = process.argv.slice(2);
const urls = [
	'/about-us/accountability',
	'/about-us/being-accountable',
	'/about-us/being-accountable/access-to-our-information',
	'/about-us/being-accountable/approach-to-accountability',
	'/about-us/being-accountable/environment',
	'/about-us/being-accountable/international-aid-transparency-initiative',
	'/about-us/being-accountable/our-finances',
	'/about-us/being-accountable/supporter-promise',
	'/about-us/emergencies/support-our-emergency-fund',
	'/about-us/history',
	'/about-us/what-we-do',
	'/about-us/where-we-work',
	'/about-us/where-we-work/united-kingdom',
	'/about-us/who-we-are/annual-report-2017--save-the-children-uk',
	'/about-us/who-we-are/ceo-and-executive-directors',
	'/about-us/who-we-are/our-president-princess-ann',
	'/about-us/who-we-are/our-values',
	'/about-us/who-we-are/trustees',
	'/about-us/who-we-are/what-we-stand-for',
	'/about-us/who-we-work-with/corporate-partnerships',
	'/about-us/who-we-work-with/corporate-partnerships/anglo-american',
	'/about-us/who-we-work-with/corporate-partnerships/arsenal',
	'/about-us/who-we-work-with/corporate-partnerships/clifford-chance',
	'/about-us/who-we-work-with/corporate-partnerships/costa-coffee',
	'/about-us/who-we-work-with/corporate-partnerships/gsk',
	'/about-us/who-we-work-with/corporate-partnerships/ikea',
	'/about-us/who-we-work-with/corporate-partnerships/johnson-and-johnson',
	'/about-us/who-we-work-with/corporate-partnerships/lloyds',
	'/about-us/who-we-work-with/corporate-partnerships/mothercare',
	'/about-us/who-we-work-with/corporate-partnerships/pearson',
	'/about-us/who-we-work-with/corporate-partnerships/prudence-foundation',
	'/about-us/who-we-work-with/corporate-partnerships/rb',
	'/about-us/who-we-work-with/corporate-partnerships/sainsburys-and-harpercollins',
	'/about-us/who-we-work-with/corporate-partnerships/thomson-reuters',
	'/about-us/who-we-work-with/corporate-partnerships/tjx-europe',
	'/about-us/who-we-work-with/corporate-partnerships/twinings',
	'/about-us/who-we-work-with/corporate-partnerships/unilever',
	'/about-us/who-we-work-with/corporate-partnerships/work-with-us',
	'/about-us/who-we-work-with/governments-and-institutions',
	'/about-us/who-we-work-with/our-partners/corporate-partnerships',
	'/about-us/who-we-work-with/our-partners/corporate-partnerships/clifford-chance',
	'/about-us/who-we-work-with/our-partners/corporate-partnerships/first-group',
	'/about-us/who-we-work-with/our-partners/corporate-partnerships/johnson-and-johnson',
	'/about-us/who-we-work-with/our-partners/corporate-partnerships/prudence-foundation',
	'/about-us/who-we-work-with/special-events/a-night-of-hits',
	'/about-us/who-we-work-with/special-events/summer-in-the-city-2015',
	'/content/dam/global/reports/modern-slavery-statement-2017.pdf',
	'/content/stc/gb/en/home',
	'/content/stc/gb/en/home/about-us/accountability-and-transparency/supporter-promise',
	'/content/stc/gb/en/home/about-us/contact-us',
	'/content/stc/gb/en/home/about-us/key-reports',
	'/content/stc/gb/en/misc/accessibility',
	'/content/stc/gb/en/misc/gdpr-suppressions',
	'/content/stc/gb/en/misc/gdpr-suppressions.html',
	'/content/stc/gb/en/misc/privacy-cookie-policy',
	'/content/stc/gb/en/misc/privacy-cookie-policy.html',
	'/content/stc/gb/en/misc/terms-conditions-of-this-website',
	'/donate/give-monthly-and-help-save-lives',
	'/donate/please-support-save-childrens-education-work',
	'/donate/sms-campaigns-terms-and-conditions',
	'/donate/united-kingdom',
	'/early-years',
	'/get-involved',
	'/get-involved/campaigns/early-years',
	'/get-involved/events-fundraising',
	'/how-you-can-help/emergencies.html',
	'/how-you-can-help/emergencies/emergency-health-unit',
	'/how-you-can-help/events-and-fundraising/get-inspired/fundraising-at-celebration-events',
	'/how-you-can-help/events-and-fundraising/get-inspired/fundraising-at-celebration-events/birthday',
	'/how-you-can-help/events-and-fundraising/get-inspired/fundraising-for-schools-nurseries-and-youth-groups',
	'/how-you-can-help/events-and-fundraising/join-an-event',
	'/how-you-can-help/events-and-fundraising/join-an-event/great-north-run',
	'/how-you-can-help/events-and-fundraising/join-an-event/ride-london',
	'/how-you-can-help/events-and-fundraising/join-an-event/royal-parks-half-marathon',
	'/how-you-can-help/events-and-fundraising/join-an-event/virgin-money-london-marathon',
	'/how-you-can-help/philanthrophy/meet-the-philanthropy-team',
	'/how-you-can-help/philanthrophy/what-philanthropists-say',
	'/how-you-can-help/philanthrophy/what-we-can-offer-you',
	'/how-you-can-help/special-events/night-of-country-',
	'/muddy-puddle-walk',
	'/news/media-centre/press-releases/news/media-centre/press-releases/child-refugee-education-crisis-looming-in-uganda',
	'/privacy',
	'/reducing-the-risk-of-disaster',
	'/resources/online-library/further-faster-fairer',
	'/resources/online-library/lighting-young-brains',
	'/resources/online-library/nowhere-safe-yemens-children',
	'/shop/community-charity-shops/ashford-kent',
	'/shop/community-charity-shops/bedford',
	'/shop/community-charity-shops/cambridge',
	'/shop/community-charity-shops/edinburgh-st.-james',
	'/shop/community-charity-shops/exeter',
	'/shop/community-charity-shops/glasgow-bearsden',
	'/shop/community-charity-shops/kirkby-lonsdale',
	'/shop/community-charity-shops/machynlleth',
	'/shop/community-charity-shops/moretonhampstead',
	'/shop/marys-living-and-giving-shops/wandsworth',
	'/shop/marys-living-and-giving-shops/wimbledon',
	'/sites/default/files/images/Halfway_There.pdf',
	'/supporter-promise',
	'/what-we-do/policy-and-practice/humanitarian-capacity-building/francophone-operations-programme--save-the-children-uk',
	'/what-we-do/policy-and-practice/humanitarian-capacity-building/humanitarian-health-and-nutrition-for-managers',
	'/what-we-do/policy-and-practice/humanitarian-capacity-building/senior-humanitarian-response-training',
	'/what-we-do/policy-and-practice/our-featured-reports/fighting-for-breath-country-briefings',
	'/what-we-do/policy-and-practice/resource-centre/the-consultation-toolkit',
	'/what-we-do/policy-and-practice/resource-centre/the-cost-of-the-diet',
	'/what-we-do/policy-and-practice/resource-centre/the-lost-boys',
	'/what-we-do/policy-and-practice/resource-centre/the-nutrition-barometer',
	'/what-we-do/policy-and-practice/resource-centre/the-right-to-learn',
	'/what-we-do/policy-and-research/resource-centre',
	'/what-we-do/policy-impact-and-practice/humanitarian-capacity-building',
	'/what-we-do/policy-impact-and-practice/humanitarian-capacity-building/wash-training',
	'/what-we-do/policy-practice/online-library',
	'/what-we-do/uk-work/cymru',
	'/what-we-do/uk-work/in-schools/born-to-read',
	'/what-we-do/what-we-do/policy-and-practice/resource-centre',
	'/2017-08/bombs-beheadings-raqqas-children-speak-out',
	'/2017-09/rohingya-crisis-response-needs-be-scaled-urgently-desperation-grows-bangladesh',
	'/about-us/emergencies/east-africa-food-crisis-appeal/ethiopia',
	'/about-us/emergencies/east-africa-food-crisis-appeal/kenya',
	'/about-us/emergencies/east-africa-food-crisis-appeal/somalia',
	'/about-us/who-we-are/annual-report-2014',
	'/about-us/who-we-work-with/artists-and-ambassadors/mario-testino',
	'/about-us/who-we-work-with/special-events/uk-fashion-and-textile-awards2015',
	'/cpie-postgraduate-diploma',
	'/donate/actions/ats-test-car',
	'/firstdaypetition',
	'/get-involved/campaigns/central-african-republic-email-your-mp',
	'/get-involved/charity-shopping/bangor',
	'/get-involved/charity-shopping/bishops-stortford',
	'/get-involved/charity-shopping/greenwich',
	'/get-involved/charity-shopping/newquay',
	'/get-involved/events-fundraising/fundraising-ideas',
	'/get-involved/events-fundraising/raise-money-in-memory',
	'/get-involved/events-fundraising/runs-walks/edinburgh-marathon-festival2018',
	'/get-involved/events-fundraising/tennis',
	'/get-involved/leave-a-legacy/guidance-for-executors',
	'/get-involved/leave-a-legacy/will-aid',
	'/get-involved/volunteer/volunteer-speaker',
	'/gift-aid-information',
	'/hamlet',
	'/milk',
	'/node/2734',
	'/node/2938',
	'/resources/online-library/annual-report-2015',
	'/resources/online-library/steps-towards-learning-guide-overcoming-language-barriers-children�s',
	'/resources/online-library/superfood-babies',
	'/sites/default/files/docs/ch.3_annex_c-_supplementary_market_guidance_guide_2_1.pdf',
	'/sites/default/files/docs/keeping_children_out_of_harmful_institutions_final_20.11.09_1.pdf',
	'/sites/default/files/docs/putting_children_at_the_centre_final_(2)_1.pdf',
	'/sites/default/files/images/child_poverty_facts_2013.pdf',
	'/sites/default/files/images/me_toolkit_booklet_4_french.pdf',
	'/sites/default/files/images/superfood_for_babies_uk_version.pdf',
	'/tennis',
	'/what-we-do/policy-and-practice/resource-centre/superfood-for-babies'
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
