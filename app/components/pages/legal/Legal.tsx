import React from 'react';
import { NavLink } from 'react-router';
import UnAuthLayout from '~/layouts/UnAuthLayout';

function Legal() {
  return (
    <UnAuthLayout>
      <div className="flex flex-col gap-4 items-center max-w-5xl mx-auto py-6 px-3 md:px-0 text-sm md:text-base">
        <div className="title space-y-3 my-5">
          <h1 className="text-2xl font-bold">Disclaimer</h1>
          <p>
            This Risk and Compliance Disclosure should be read in conjunction
            with CoinbitDex Customer Agreement (Terms). In plain English, we
            expect you to understand the important compliance matters and
            liability clauses while you trade on our platform.
          </p>
        </div>
        <main className="space-y-5">
          <article className="section space-y-4">
            <h2 className="text-lg font-semibold">
              1. PURPOSE OF OUR PROGRAMS
            </h2>
            <p>
              We have established and implemented an Anti-Money Laundering,
              Anti-Terrorist Financing, and Trade & Economic Sanctions Program
              to ensure a robust and compliant digital asset trading platform.
              We want to promote legal, transparent business activities and
              maintain a strong reputation among our customers, regulators, and
              the digital asset industry.
            </p>
          </article>
          <article className="section space-y-4">
            <h2 className="text-lg font-semibold">2. REGULATORY LANDSCAPE</h2>
            <p>
              We understand that regulatory bodies have taken a diverse approach
              to the laws and regulations regarding digital assets, including
              some characterizing or defining digital assets as virtual
              financial assets (by Malta), convertible virtual currency (by USA
              FinCEN,) or virtual commodity (by Hong Kong). As a trading
              platform, we believe that all digital assets available on
              CoinbitDex are an innovative alternative asset class; therefore,
              digital assets should not be called currency or money​.
            </p>
          </article>
          <article className="section space-y-4">
            <h2 className="text-lg font-semibold">3. DISCLOSURE</h2>
            <p>
              Digital assets are not fiat money nor fiat currency. Digital
              assets are NOT backed by any government or central bank. We may at
              times have opinions on the different regulatory approaches taken
              by various government bodies; however, at all times, we will fully
              abide by the rules and regulations of the respective countries we
              operate in. We regularly communicate with regulators and the
              industry on the best approach to regulating digital asset
              businesses. We cooperate with governments and respect regulations
              and comply with applicable regulations. As good corporate
              citizens, we may be asked for information from law enforcement
              authorities and will assist if permissible by law as law
              enforcement conduct investigations to pursue and thwart illicit
              activity. What this also means is that our platform is intended
              for law-abiding customers. We would like to serve you while you
              act legally and properly on our platform. Furthermore, CoinbitDex
              does not accept certain customers. To maintain our strong
              reputation in the market and ensure a robust compliant
              marketplace, we have decided to not seek nor accept customers from
              certain jurisdictions the list of excluded countries may vary and
              may vary by service.
            </p>
          </article>
          <article className="section space-y-4">
            <h2 className="text-lg font-semibold">4. OUR AML/ATF PROGRAM</h2>
            <p>
              We have designed our Program to be anti-money laundering (AML) and
              anti-terrorist financing (ATF) through a risk-based and
              multi-layer control system. The first layer includes a stringent
              customer identification program, including verifying the identity
              of our customers, whether individuals or entities. In addition to
              obtaining identification documents, we obtain for non-natural
              persons their entities’ beneficial owners/natural persons
              consistent with international standards such as the Financial
              Action Task Force (FATF). The second layer includes a risk-based
              system to warrant additional customer due diligence. To accomplish
              this, we screen our customers (including beneficial owners)
              against the entities/persons on The Government of the Hong Kong
              SAR Gazette, United States Office of Foreign Assets Control (OFAC)
              Sanctions Lists, and the United Nation Security Council Sanctions
              List, among other government-provided lists of sanctioned
              individuals and entities. We also may screen against other lists
              on a discretionary basis to protect our reputation and customers.
              The third layer includes ongoing monitoring for suspicious
              activity. If our Program suspects or has reason to suspect
              suspicious activities have occurred, we will file suspicious
              activities reports with local regulators. A suspicious transaction
              is often inconsistent with a customer’s known and legitimate
              business, or personal activities.
            </p>
          </article>
          <article className="section space-y-4">
            <h2 className="text-lg font-semibold">5. LIABILITY</h2>
            <div className="space-y-1">
              <h2 className="font-semibold">5.1 LIABILITY</h2>
              <p>
                For the purposes of this document, all and any services provided
                via the CoinbitDex platform or through its associated companies
                and/or partners, whether related to cryptocurrency, and/or its
                derivatives and the trading thereof, shall be collectively known
                as 'the Services'. TO THE MAXIMUM EXTENT PERMITTED UNDER
                APPLICABLE LAW, THE SERVICES, THE CoinbitDex MATERIALS AND ANY
                PRODUCT, SERVICE OR OTHER ITEM PROVIDED BY OR ON BEHALF OF
                CoinbitDex ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS.
                AND CoinbitDex EXPRESSLY DISCLAIMS, AND YOU WAIVE, ANY AND ALL
                OTHER WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED,
                INCLUDING, WITHOUT LIMITATION, IMPLIED WARRANTIES OF
                MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE OR
                NON-INFRINGEMENT OR WARRANTIES ARISING FROM COURSE OF
                PERFORMANCE, COURSE OF DEALING OR USAGE IN TRADE. WITHOUT
                LIMITING THE FOREGOING, CoinbitDex DOES NOT REPRESENT OR WARRANT
                THAT THE SITE, THE SERVICES OR CoinbitDex MATERIALS ARE
                ACCURATE, COMPLETE, RELIABLE, CURRENT, ERROR-FREE, OR FREE OF
                VIRUSES OR OTHER HARMFUL COMPONENTS. CoinbitDex DOES NOT
                GUARANTEE THAT ANY ORDER WILL BE EXECUTED, ACCEPTED, RECORDED OR
                REMAIN OPEN. EXCEPT FOR THE EXPRESS STATEMENTS SET FORTH IN THIS
                AGREEMENT, YOU HEREBY ACKNOWLEDGE AND AGREE THAT YOU HAVE NOT
                RELIED UPON ANY OTHER STATEMENT OR UNDERSTANDING, WHETHER
                WRITTEN OR ORAL, WITH RESPECT TO YOUR USE AND ACCESS OF THE
                SERVICES.
              </p>
              <div className="mt-3">
                <h3 className="font-semibold">
                  {' '}
                  WITHOUT LIMITING THE FOREGOING, YOU HEREBY UNDERSTAND AND
                  AGREE THAT CoinbitDex WILL NOT BE LIABLE FOR ANY LOSSES OR
                  DAMAGES ARISING OUT OF OR RELATING TO:
                </h3>
                <ul className="list-disc">
                  <li>
                    (A) ANY INACCURACY, DEFECT, OR OMISSION OF DIGITAL CURRENCY
                    PRICE DATA;
                  </li>
                  <li>
                    (B) ANY ERROR OR DELAY IN THE TRANSMISSION OF SUCH DATA;
                  </li>
                  <li>(C) INTERRUPTION IN ANY SUCH DATA AND;</li>
                  <li>
                    (D) ANY DAMAGES INCURRED BY ANOTHER USER’S ACTIONS,
                    OMISSIONS OR VIOLATION OF THIS AGREEMENT.
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-1">
              <h2 className="font-semibold">5.2 LIABILITY</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT
                WILL CoinbitDex, ITS AFFILIATES AND THEIR RESPECTIVE
                SHAREHOLDERS, MEMBERS, DIRECTORS, OFFICERS, EMPLOYEES,
                ATTORNEYS, AGENTS, REPRESENTATIVES, SUPPLIERS OR CONTRACTORS BE
                LIABLE FOR ANY INCIDENTAL, INDIRECT, SPECIAL, PUNITIVE,
                CONSEQUENTIAL OR SIMILAR DAMAGES OR LIABILITIES WHATSOEVER
                (INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF DATA,
                INFORMATION, REVENUE, PROFITS OR OTHER BUSINESS OR FINANCIAL
                BENEFIT) ARISING OUT OF OR IN CONNECTION WITH THE SERVICES, ANY
                PERFORMANCE OR NON-PERFORMANCE OF THE SERVICES, OR ANY OTHER
                PRODUCT, SERVICE OR OTHER ITEM PROVIDED BY OR ON BEHALF OF
                CoinbitDex AND ITS AFFILIATES, WHETHER UNDER CONTRACT, STATUTE,
                STRICT LIABILITY OR OTHER THEORY EVEN IF CoinbitDex HAS BEEN
                ADVISED OF THE POSSIBILITY OF SUCH DAMAGES EXCEPT TO THE EXTENT
                OF A FINAL JUDICIAL DETERMINATION THAT SUCH DAMAGES WERE A
                RESULT OF CoinbitDex’s GROSS NEGLIGENCE, FRAUD, WILLFUL
                MISCONDUCT OR INTENTIONAL VIOLATION OF LAW. SOME JURISDICTIONS
                DO NOT ALLOW THE EXCLUSION OR LIMITATION OF INCIDENTAL OR
                CONSEQUENTIAL DAMAGES, SO THE ABOVE LIMITATION MAY NOT APPLY TO
                YOU.
              </p>
              <p className="mt-3">
                NOTWITHSTANDING THE FOREGOING, IN NO EVENT WILL THE LIABILITY OF
                CoinbitDex, ITS AFFILIATES AND THEIR RESPECTIVE SHAREHOLDERS,
                MEMBERS, DIRECTORS, OFFICERS, EMPLOYEES, ATTORNEYS, AGENTS,
                REPRESENTATIVES, SUPPLIERS OR CONTRACTORS ARISING OUT OF OR IN
                CONNECTION THE SERVICES, ANY PERFORMANCE OR NON-PERFORMANCE OF
                THE SERVICES, OR ANY OTHER PRODUCT, SERVICE OR OTHER ITEM
                PROVIDED BY OR ON BEHALF OF CoinbitDex OR ITS AFFILIATES WHETHER
                UNDER CONTRACT, STATUTE, STRICT LIABILITY OR OTHER THEORY,
                EXCEED THE AMOUNT OF THE FEES PAID BY YOU TO CoinbitDex UNDER
                THIS AGREEMENT IN THE TWELVE-MONTH PERIOD IMMEDIATELY PRECEDING
                THE EVENT GIVING RISE TO THE CLAIM FOR LIABILITY.
              </p>
            </div>
          </article>
          <article className="section space-y-4">
            <h2 className="text-lg font-semibold">6. LANGUAGE OF USE</h2>
            <p>
              This Privacy Policy may be published in different languages. In
              case of any discrepancy, please refer to the English version.
            </p>
          </article>
        </main>
        <footer className="mt-5 w-full flex justify-center">
          <NavLink
            to={'/signup'}
            className="text-center text-blue-600 font-semibold underline"
          >
            {'<<<Register on Coinbitdex>>>'}
          </NavLink>
        </footer>
      </div>
    </UnAuthLayout>
  );
}

export default Legal;
