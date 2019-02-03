import React from 'react';
import Header from './Header';
import Footer from './footer';
import MyAds from './layouts/myads';

import '../static/css/account.css';


class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <div className="container">
                    <Header />
                    <ul className="nav nav-tabs md-tabs nav-justified">
                        <li className="nav-item">
                            <a className="nav-link active" data-toggle="tab" href="#panel1" role="tab">You'r Ads</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#panel2" role="tab">Messages</a>
                        </li>
                        
                    </ul>
                    <div className="tab-content card" id="tabcard">

                        <div className="tab-pane fade in show active" id="panel1" role="tabpanel">
                           

                            <MyAds />
                        </div>

                        <div className="tab-pane fade" id="panel2" role="tabpanel">
                            <br />
                            <p>OLX Group is a global online marketplace (headquartered in Amsterdam, and owned by South African media and technology group Naspers),
                                [1] operating in 45 countries,
                                [2] and is the largest online classified ads company in Pakistan, Brazil, India, Bulgaria, Poland,
                                [1] Portugal and Ukraine.
                                [3] It was founded in 2006..</p>
                            <p>The OLX marketplace is a platform for buying and selling services and goods such as electronics, 
                                furniture, household goods, cars and bikes. In 2014, the platform had 11 billion page views, 200 million monthly active users, 25 million listings, and 8.5 million transactions per month.[1]

In 2006, it acquired Mundoanuncio.com, a classifieds site targeting the Hispanic market and in 2007, it made an investment Chinese classifieds
 site in Edeng.cn.[5] In 2008, its growth in the Philippines was attributed to its partnership with Friendster.[6]

The company invested in "Web 2.0" features in 2008, such as social network widgets, improved search, Ajax-based editors, interactive maps, and mobile versions.[6]

In 2009, the company partnered with Hi5, a social network, which at the time had 60 million users. Hi5 implemented OLX features, such as displaying ads and sharing ads with friends, and OLX enabled video, image and mobile features, in 39 languages and 90 countries.[7]

In 2010, a majority of the company was acquired by the South African media group Naspers,[8] which bought out the existing investors.[5]

CEO Alec Oxenford said in a 2014 interview that OLX adopted a "Martian approach" to international expansion, launching in India, the largest available market, rather than in the United States.[1] Naspers consolidated its online classified operations in the Philippines, Thailand, Poland, Hungary, Bulgaria, Romania, Ukraine, Belarus, Kazakhstan and Indonesia and re-branded them as OLX.[4]

The company invested heavily in television advertising. Oxenford said that adoption of the internet by more than three billion people has made television more effective as a driver of traffic to websites or apps than it was during the early dot-com period, when television advertising didn't work well for websites.[1] He said that OLX acted as a “wealth creator” in emerging markets, enabling people to easily monetize their services and possessions.[1]

In 2014, OLX's global traffic was 240 million unique monthly visits, 54% of which came from mobile .[9]

In late 2016 it launched Tradus as a heavy machinery classifieds site [10]. It lists ads for used, heavy machinery and vehicles in the fields of construction, transport, and farming, and also spare parts for such machines..</p>
                        </div>

                        <div className="tab-pane fade" id="panel3" role="tabpanel">
                            <br />
                        </div>

                    </div>
                </div>
                <Footer />
            </div>

        );
    }
}

export default Account;