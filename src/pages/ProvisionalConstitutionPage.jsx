import { ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const preamble = `白東民國臨時憲法

序言

白東民國之國民，為確保自由、正義與和平，為維護主權在民之原則，促進民主、法治、平等與博愛之社會，特制定本憲法。

白東民國誓以永遠排除戰爭與暴政，確立國民主權與權力分立之憲政體制，以保國民之權利與自由，並確保國家永續發展與全體國民之福祉。

第一章 總綱

第一條 白東民國為國民主權之民主共和國。主權屬於全體國民。

第一條之二 白東民國為統一國家，領土不可分割。任何組織、團體或個人不得以任何形式分裂國家或危害國家主權、領土完整之活動。國家依法保障統一與穩定，並透過法律制度維護民族團結與國家完整。

第二條 本憲法為國家最高法，具有最高之法律效力。任何法律、命令、條約及地方規章與本憲法牴觸者，無效。全國一切立法、行政、司法、监察、考试及其他公權力行使，均以本憲法為依據。

第三條 國家元首為白東民國總統，為國家之象徵，代表國家行使憲法所定職權。

第四條 國家承認並保障國民之基本人權，尊重信仰、思想、言論及人格之自由。

第五條 白東民國允許雙重國籍，相關規定由法律定之。

第六條 白東民國無國教，宗教自由受保障。

第七條 國旗為藍白旗幟，上藍下白，各占二分之一；國徽由盾形國旗、橄欖枝、交叉雙劍、智慧之眼、國花茉莉與刻有國名之徽帶組成。

第八條 首都為奉天府。

第二章 國民權利與義務

第九條 白東民國國民享有言論、信仰、出版、集會、結社等自由。國民之生命、自由及財產受憲法保障，非依法律不得剝奪。

第十條 國民在法律上一律平等。國家不得因性別、種族、宗教、語言、出生或其他身份而予差別對待。

第十一條 國家應保障國民之基本生活、教育與社會安全。

第十二條 國民有遵守憲法與法律、納稅、服兵役及維護國家與公共利益之義務。行使自由與權利時，不得妨害他人自由、社會秩序或公共福祉。

第三章 國會

第十三條 國會為國家最高立法機關，行使立法權、預算權、監督權及罷免權。

第十四條 國會為一院制，由國民直接選舉產生。任期四年，得連任。

第十五條 國會多數黨組成民國府，黨魁出任總理。

第十六條 議會之選舉，應依公平、公正、公開、普遍、平等、直接及秘密之原則行之。選舉制度及程序，由法律定之。

第十七條 國會有權彈劾行政、司法、監察及考試機關人員。彈劾及罷免之具體程序，由法律定之。

第四章 民國府

第十八條 民國府為最高行政機關，行使行政權，對國會負責。

第十九條 總理為民國府首長，綜理國政，提名產生並指揮各部會，對國會負責。

第二十條 民國府之組織及職權，由法律定之。

第五章 民國院

第二十一條 民國院為中央司法系統之統稱，為名義上的最高審判、憲政監督及最高檢查機關。

第二十二條 民國院置下列三機關，平行設置：一、憲法法院；二、最高法院；三、中央檢察署。三機關各行其權，互不隸屬，同屬民國院之司法體系。

第二十三條 最高法院為民事、刑事及行政案件之最終審判機關。憲法法院掌理憲法解釋、違憲審查、政黨違憲審查及法政訴訟等案件。中央檢察署代表國家行使公訴權，依法指揮偵查，維護法律秩序與公共利益。`;

export default function ProvisionalConstitutionPage() {
  const lines = preamble.split('\n').filter(l => l.trim());
  
  return (
    <>
      <div className="page-header"><div className="page-header-inner"><h1>Provisional Constitution of Bronoto</h1></div></div>
      <section className="page-section white">
        <div className="section-inner">
          <div style={{marginBottom:'var(--space-2xl)',display:'flex',alignItems:'center',gap:'var(--space-md)',flexWrap:'wrap'}}>
            <span style={{fontSize:'.8rem',padding:'4px 12px',borderRadius:'10px',background:'var(--blue-pale)',color:'var(--blue-deep)',fontWeight:600,fontFamily:'var(--font-ui)'}}>RY5 · 已公布</span>
            <span style={{fontSize:'.85rem',color:'var(--text-muted)',fontFamily:'var(--font-ui)'}}>民國五年公布，為正式憲法通過前之根本大法</span>
          </div>
          
          <div style={{maxWidth:800,margin:'0 auto'}}>
            {lines.map((line, i) => {
              const isChapter = /^第[一二三四五六七八九十]+章/.test(line);
              const isPreamble = line === '序言';
              if (isChapter || isPreamble) {
                return (
                  <h2 key={i} style={{
                    fontFamily:'var(--font-display)',
                    fontSize:'1.5rem',
                    fontWeight:800,
                    color:'var(--near-black)',
                    letterSpacing:'-.03em',
                    marginTop:i>0?'var(--space-2xl)':'0',
                    marginBottom:'var(--space-lg)',
                    paddingBottom:'var(--space-sm)',
                    borderBottom:'2px solid var(--blue-mid)'
                  }}>{line}</h2>
                );
              }
              return (
                <p key={i} style={{
                  fontSize:'.92rem',
                  color:'var(--text-secondary)',
                  lineHeight:2,
                  marginBottom:'var(--space-md)',
                  textAlign:'justify'
                }}>{line}</p>
              );
            })}
          </div>
          
          <div style={{marginTop:'var(--space-3xl)',textAlign:'center'}}>
            <Link to="/laws" style={{fontFamily:'var(--font-ui)',fontSize:'.85rem',fontWeight:600,display:'inline-flex',alignItems:'center',gap:'var(--space-xs)'}}>
              <ArrowUp size={14} style={{transform:'rotate(-90deg)'}} /> Back to Legislation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
