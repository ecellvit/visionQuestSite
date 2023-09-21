import '../styles/investors.module.css'
export default function InvestorInfo(props) {
  // static page for displaying round 2 information
  const investorDetails = [
    {
      name:"Investor 1" ,
      description :`This investor demonstrates an exceptional talent for navigating the financial
markets, consistently achieving outstanding results. Their well-informed
decisions often lead to favorable outcomes, leaving others in awe of their
strategic prowess. With a keen eye for opportunity, this investor is now
considering acquiring approximately a 13-20% stake in the company,
sparking intrigue and curiosity among observers who are eager to uncover
the secrets behind their impressive track record.`
    },
    {
      name: "Investor 2",
      description: `This investor appears to have a distinctive talent for making calculated moves
in the stock market, frequently resulting in favorable outcomes. Their strategic
actions often lead to significant gains, capturing the attention of those who
closely follow market dynamics. While their methods may have their own
intricacies, inviting intrigue, this investor is currently exploring the possibility of
acquiring approximately 13-20% of the company. Many are interested in
unraveling the secrets behind their unconventional yet successful approach to
investing.`
    },
    {
      name: "Investor 3",
      description: `This investor possesses a remarkable talent for crafting intricate financial
opportunities, offering companies the promise of significant growth and
substantial funding commitments. Their presentations are a captivating
display of persuasive rhetoric, envisioning a prosperous future for those
fortunate enough to secure their investments. There's a sense of high
ambition at play, with a reward that extends beyond mere equity, wrapped in
an air of curiosity.
The investment terms they propose may appear straightforward on the
surface, but they harbor layers of intricacy, requiring a sharp analytical mind
to decipher the full extent of their intentions. This investor is requesting
approximately 15-20% stake in the company, which can be seen as a sign of
their commitment and belief in the company's potential.`
    },
    {
      name:"Investor 4",
      description: `In the world of investing, this seasoned and perceptive individual stands as a
beacon of excellence, exemplifying the qualities of a responsible and
successful investor. While their brilliance may not always be immediately
obvious, their results speak volumes, and their contributions to the financial
world are undeniable. However, in a landscape filled with alluring alternatives,
potential investors may want to carefully weigh the implications of their
request for a 10-15% stake in ventures, considering whether it aligns with
their own financial objectives and risk tolerance.`
    },
    {
      name:"Investor 5",
      description: `Their precision in assessing risks elicits both admiration and curiosity, as they
expertly balance the tightrope between monumental success and occasional
setbacks. With a unique talent for dissecting complex financial landscapes,
they make well-informed and calculated decisions, fearlessly pursuing
opportunities others may avoid due to perceived risks. Their commitment to
exploring uncharted territories and expanding the horizons of conventional
investment showcases a deep dedication to crafting success. Yet, in the eyes
of some, this unwavering determination may appear as unscrupulous
ruthlessness, casting shadows of doubt upon an otherwise stellar record of
financial prowess.`
    }
  ];

  return (
    <div className="investorList">
      <h1>Investors</h1>
      <div className="investorListDiv">List of Investors.</div>
        {investorDetails.map((x) => (
          <div key={x.name} className="investor">
            <h1>{x.name}</h1>
            <p>{x.description}</p>
          </div>
        ))}
      <button
        onClick={() => {
          props.onProceed();
        }}
      >
        Proceed
      </button>
    </div>
  );
}
