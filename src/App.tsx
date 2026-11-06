import { useEffect, useRef, useState } from 'react'
import { ArrowDown, Heart, Music2, Pause, Play, Sparkles } from 'lucide-react'

type Memory = { image: string; date: string; caption: string; note: string; rotate: string }

// เปลี่ยนข้อความและรูปภาพในส่วนนี้ให้เป็นเรื่องราวของคุณสองคน
const memories: Memory[] = [
  { image: '/images/photo-01.jpg', date: 'วันที่เราเริ่มต้น', caption: 'one of my favorite days', note: 'ยังจำความรู้สึกวันนั้นได้อยู่เลย :)', rotate: '-2deg' },
  { image: '/images/photo-02.jpg', date: 'วันธรรมดาที่พิเศษ', caption: 'just us being us', note: 'แค่ได้อยู่ด้วยกัน วันธรรมดาก็ดีขึ้นเยอะเลย', rotate: '2.4deg' },
  { image: '/images/photo-03.jpg', date: 'รอยยิ้มที่ชอบ', caption: 'your smile, always', note: 'ชอบเวลาที่เธอยิ้มแบบนี้ที่สุด', rotate: '-1.2deg' },
  { image: '/images/photo-04.jpg', date: 'ทริปเล็ก ๆ ของเรา', caption: 'somewhere with you', note: 'อยากมีรูปแบบนี้ด้วยกันอีกเยอะ ๆ', rotate: '2deg' },
  { image: '/images/photo-05.jpg', date: 'ความทรงจำอีกหน้า', caption: 'a tiny happy moment', note: 'เก็บเรื่องเล็ก ๆ พวกนี้ไว้ในใจเสมอ', rotate: '-2.5deg' },
  { image: '/images/photo-06.jpg', date: 'ที่ที่มีเธอ', caption: 'my kind of place', note: 'สถานที่ไม่สำคัญเท่าคนที่ไปด้วยกัน', rotate: '1.5deg' },
  { image: '/images/photo-07.jpg', date: 'อีกวันที่อยากจำ', caption: 'wish we could pause time', note: 'บางทีก็อยากหยุดเวลาไว้ตรงนี้นาน ๆ', rotate: '-1.8deg' },
  { image: '/images/photo-08.jpg', date: 'รูปโปรดอีกรูป', caption: 'to more little adventures', note: 'ขอให้เรายังมีเรื่องให้หัวเราะด้วยกันอีกเยอะเลย', rotate: '2.2deg' },
]

function PhotoPlaceholder({ index }: { index: number }) {
  const tones = ['#d7d6c4', '#e5cfc0', '#c8d4cf', '#d9c7c6', '#e3d8b9', '#c9d0dc', '#e4cfc3', '#d0d8c6']
  return <div className="photo-placeholder" style={{ background: `linear-gradient(145deg, ${tones[index % tones.length]}, #f3e9db)` }}>
    <span className="placeholder-sun" />
    <span className="placeholder-hill hill-one" />
    <span className="placeholder-hill hill-two" />
    <span className="placeholder-label">ใส่รูปของเรา {String(index + 1).padStart(2, '0')}</span>
  </div>
}

function PhotoCard({ memory, index }: { memory: Memory; index: number }) {
  const [missing, setMissing] = useState(false)
  return <figure className="polaroid" style={{ ['--tilt' as string]: memory.rotate }}>
    <div className="photo-window">
      {!missing && <img src={memory.image} alt={memory.date} loading="lazy" onError={() => setMissing(true)} />}
      {missing && <PhotoPlaceholder index={index} />}
    </div>
    <figcaption className="photo-date">{memory.date}</figcaption>
    <p className="photo-caption">{memory.caption}</p>
    <span className="tape" aria-hidden="true" />
  </figure>
}

export default function App() {
  const [opened, setOpened] = useState(false)
  const [musicOn, setMusicOn] = useState(false)
  const [showWish, setShowWish] = useState(false)
  const letterRef = useRef<HTMLElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (opened) {
      const timer = window.setTimeout(() => letterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 950)
      return () => window.clearTimeout(timer)
    }
  }, [opened])

  async function toggleMusic() {
    const audio = audioRef.current
    if (!audio) return
    if (musicOn) { audio.pause(); setMusicOn(false); return }
    try { await audio.play(); setMusicOn(true) } catch { setMusicOn(false) }
  }

  return <main className="page-shell">
    <div className="grain" aria-hidden="true" />
    <header className="topline">
      <span className="topline-mark"><Heart size={13} fill="currentColor" /> a little something</span>
      <button className="music-button" onClick={toggleMusic} aria-label={musicOn ? 'ปิดเพลง' : 'เปิดเพลง'}>
        {musicOn ? <Pause size={15} /> : <Music2 size={15} />}
        <span>{musicOn ? 'Pause song' : 'Play our song'}</span>
      </button>
      <audio ref={audioRef} src="/music/our-song.mp3" loop preload="none" onEnded={() => setMusicOn(false)} />
    </header>

    <section className={`envelope-scene ${opened ? 'is-open' : ''}`} aria-label="ซองจดหมายวันเกิด">
      <div className="scene-note note-left">made with love</div>
      <div className="scene-note note-right">for you, always ♡</div>
      <div className="envelope-wrap">
        <div className="letter-peek"><span>ถึงคนโปรดของเรา ♡</span><span className="peek-line" /></div>
        <div className="envelope-back" />
        <div className="envelope-letter-shadow" />
        <div className="envelope-front"><span className="front-fold left-fold" /><span className="front-fold right-fold" /><span className="front-fold bottom-fold" /></div>
        <div className="envelope-flap"><span className="seal"><Heart size={22} fill="currentColor" strokeWidth={1.5} /></span></div>
        <div className="envelope-stamp"><span>FOR</span><Heart size={12} fill="currentColor" /><span>YOU</span></div>
      </div>
      <div className="envelope-intro">
        <p className="eyebrow"><Sparkles size={13} /> A SMALL BIRTHDAY SURPRISE</p>
        <h1>Chapter 30<br /><em>จดหมายถึงคนเก่งของเรา</em></h1>
        <p className="intro-copy">22 November 2026 · Your 30th birthday<br />ตั้งใจทำสิ่งเล็ก ๆ นี้ให้เธอ ♡</p>
        <button className="open-button" onClick={() => setOpened(true)} disabled={opened}>
          {opened ? 'จดหมายเปิดแล้ว ♡' : 'เปิดจดหมายของเธอ'} <span aria-hidden="true">↗</span>
        </button>
        <span className="tiny-hint">take your time · made just for you</span>
      </div>
      <div className="scene-flower flower-one">✳</div><div className="scene-flower flower-two">✿</div>
    </section>

    <section ref={letterRef} className={`letter-content ${opened ? 'letter-visible' : ''}`}>
      <div className="paper-sheet">
        <div className="paper-holes" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
        <div className="letter-topline"><span>CHAPTER 30 · OUR LITTLE STORY</span><span>22.11.2026 ♡</span></div>
        <div className="letter-heading">
          <p className="handwritten small-hand">Happy 30th Birthday, my love!</p>
          <h2>สุขสันต์วันเกิดนะ<br /><span>คนเก่งของเรา</span></h2>
          <p className="letter-date">22 พฤศจิกายน 2026 · บทใหม่ของเธอ ♡</p>
        </div>
        <div className="letter-body">
          <p>ก่อนอื่นเลย อยากบอกว่า <span className="underline-wavy">เราภูมิใจในตัวเธอมากนะ</span> และดีใจมาก ๆ ที่ได้เป็นคนหนึ่งที่ได้เห็นเธอเติบโต</p>
          <p>เธอเป็นคนเก่ง ทำงานเก่ง และจัดการชีวิตของตัวเองได้ดีเสมอ เราชื่นชมความตั้งใจและความสามารถของเธอจริง ๆ แต่เราอยากให้เธอรู้ไว้อีกอย่างว่า เธอไม่จำเป็นต้องเก่งหรือเข้มแข็งตลอดเวลาก็ได้นะ</p>
          <p>วันไหนเหนื่อย วันไหนอยากพัก หรือวันที่แค่อยากมีใครสักคนรับฟัง เธอไม่ต้องอธิบายทุกอย่างให้เก่งก็ได้ เราอยากเป็นคนที่รับฟัง เข้าใจ และอยู่ข้าง ๆ เธอในแบบที่เธอเป็น <span className="handwritten inline-hand">you can always be yourself</span> ♡</p>
        </div>
        <div className="chapter-card">
          <span className="section-number">A FEW DATES TO KEEP</span>
          <div className="chapter-date-row">
            <div><span className="chapter-date">09.08.2026</span><strong>The day we became us.</strong><p>วันที่เราเริ่มต้นเป็นแฟนกัน และเริ่มมีคำว่าเราในทุก ๆ วัน</p></div>
            <span className="chapter-heart">♡</span>
          </div>
          <div className="chapter-date-row">
            <div><span className="chapter-date">22.11.2026</span><strong>Chapter 30 begins.</strong><p>อีกหนึ่งบทของชีวิตที่เราอยากเห็นเธอมีความสุขและภูมิใจในตัวเอง</p></div>
            <span className="chapter-heart">✳</span>
          </div>
          <div className="friday-note"><span className="handwritten">Friday soul × Friday soul</span><p>เราเกิดวันศุกร์เหมือนกันด้วยนะ เป็นความบังเอิญเล็ก ๆ ที่เราชอบ ♡</p></div>
        </div>
        <div className="margin-doodle">♡<span>♡</span></div>
        <div className="memory-intro">
          <span className="section-number">01 / OUR LITTLE WORLD</span>
          <h3>เรื่องเล็ก ๆ ที่เรา<br /><em>อยากจำไปนาน ๆ</em></h3>
          <p>เลื่อนดูช้า ๆ ก็ได้นะ รูปพวกนี้ทำให้เรายิ้มทุกครั้งเลย</p>
        </div>
        <div className="memory-grid">
          {memories.map((memory, index) => <div className={`memory-item memory-${index + 1}`} key={memory.image}>
            <PhotoCard memory={memory} index={index} />
            <p className="memory-note">{memory.note}</p>
          </div>)}
        </div>
        <div className="tiny-note-card"><span className="note-star">✳</span><p className="handwritten">my favorite memories<br />are the ones with you.</p><span className="note-heart">♡</span></div>
        <div className="wish-section">
          <span className="section-number">02 / A WISH FOR YOU</span>
          <div className="wish-doodle">✿</div>
          <h3>ยินดีต้อนรับสู่บทที่ 30<br /><em>ขอให้ปีนี้ใจดีกับเธอ</em></h3>
          <p>ขอให้เธอยังได้ทำงานที่ภูมิใจ ได้เติบโตในแบบที่ต้องการ และมีโอกาสได้ใช้ชีวิตในแบบที่ตัวเองชอบ ขอให้ความพยายามที่เธอทุ่มเทมาตลอดค่อย ๆ ออกดอกออกผล และอย่าลืมหันกลับมาชื่นชมตัวเองบ้างนะ เพราะเธอทำได้ดีมากแล้ว</p>
          <p>และในวันที่เหนื่อยหรือไม่เป็นอย่างใจ ขอให้เธอรู้ว่าไม่ต้องรับมือทุกอย่างคนเดียวก็ได้ เธอมีสิทธิ์อ่อนแอ มีสิทธิ์พัก และมีสิทธิ์ต้องการความรักกับความเข้าใจเหมือนกัน เราอาจแก้ทุกปัญหาแทนเธอไม่ได้ แต่เราพร้อมฟัง พร้อมกอด และพร้อมอยู่ข้าง ๆ โดยไม่ตัดสินเสมอ</p>
          <button className="wish-reveal-button" onClick={() => setShowWish(!showWish)}>{showWish ? 'เก็บความลับไว้ก่อน ♡' : 'มีอีกอย่างอยากบอกเธอ…'} <span>{showWish ? '−' : '+'}</span></button>
          {showWish && <div className="secret-message"><span className="handwritten">one last thing...</span><p>เราไม่ได้อยากให้เธอต้องเป็นคนเก่งสำหรับทุกคนตลอดเวลา แค่อยากให้เวลาที่อยู่กับเรา เธอวางทุกอย่างลงได้บ้าง เป็นตัวเองได้เต็มที่ และมั่นใจว่าเธอจะได้รับความรักโดยไม่ต้องพยายามพิสูจน์อะไรเลย</p><p>ขอบคุณที่เลือกเริ่มต้นเรื่องราวนี้ด้วยกันตั้งแต่วันที่ 9 สิงหาคมที่ผ่านมา เราดีใจที่ได้เป็นส่วนหนึ่งของชีวิตเธอ และหวังว่าจะได้อยู่ในวันธรรมดา ๆ รวมถึงวันสำคัญของเธอไปอีกหลายปี</p><p className="handwritten secret-end">รักและอยู่ข้างเธอเสมอนะ ♡</p></div>}
        </div>
        <div className="signature-block">
          <p>ขอบคุณที่เกิดมา และขอบคุณที่ให้เราได้เป็นส่วนหนึ่งในชีวิตเธอนะ</p>
          <p className="handwritten signature">ด้วยรักและความเข้าใจ, คนข้าง ๆ เธอ ♡</p>
          <div className="signature-stamp"><Heart size={21} fill="currentColor" /><span>SEALED<br />WITH LOVE</span></div>
        </div>
        <footer className="paper-footer"><span>made slowly, with love</span><span>หน้าโปรดของเรา ♡</span></footer>
      </div>
      <div className="end-note"><Heart size={14} fill="currentColor" /> that's all, my favorite person <Heart size={14} fill="currentColor" /></div>
      <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowDown size={14} className="up-arrow" /> กลับไปดูซองจดหมายอีกครั้ง</button>
    </section>
    <footer className="site-footer">a little page, made only for you <span>✳</span></footer>
  </main>
}
