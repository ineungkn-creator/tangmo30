import { useEffect, useRef, useState } from 'react'
import { ArrowDown, Heart, Music2, Pause, Sparkles } from 'lucide-react'

type Memory = { image: string; date: string; caption: string; note: string; rotate: string }

// เวลาเริ่มเล่นเพลง หน่วยเป็นวินาที เช่น 90 = 1:30, 125 = 2:05
const MUSIC_START_SECONDS = 171

// เปลี่ยนข้อความและรูปภาพในส่วนนี้ให้เป็นเรื่องราวของคุณสองคน
const memories: Memory[] = [
  { image: '/images/photo-01.png', date: 'วันแรก ๆ ของเรา', caption: 'one of our first memories', note: 'ยังเป็นช่วงที่เราเพิ่งเริ่มเรียนรู้กัน แต่พอมองย้อนกลับไปก็เป็นช่วงเวลาที่น่ารักมากเลย', rotate: '-2deg' },
  { image: '/images/photo-02.png', date: 'วันธรรมดาที่มีเธอ', caption: 'the little things with you', note: 'ไม่ต้องมีแพลนพิเศษอะไรเลย แค่ได้ใช้เวลาด้วยกันก็มีความสุขแล้ว', rotate: '2.4deg' },
  { image: '/images/photo-03.jpg', date: 'รอยยิ้มที่ชอบ', caption: 'your smile makes my day', note: 'เป็นรอยยิ้มที่เห็นกี่ครั้งก็ยังชอบ และหวังว่าจะได้เห็นแบบนี้ไปอีกนาน ๆ', rotate: '-1.2deg' },
  { image: '/images/photo-04.jpg', date: 'ไปด้วยกันอีกนะ', caption: "let's go somewhere together", note: 'ยังมีอีกหลายที่ที่อยากชวนหนูไป และอีกหลายเรื่องที่เราอยากลองทำด้วยกัน', rotate: '2deg' },
  { image: '/images/photo-05.jpg', date: 'ที่ไหนก็พิเศษ', caption: 'anywhere feels like home', note: 'ไม่ได้สำคัญว่าที่ไหน แค่มีหนูอยู่ข้าง ๆ ก็รู้สึกว่าที่ตรงนั้นพิเศษขึ้นมาแล้ว', rotate: '1.5deg' },
  { image: '/images/photo-06.jpg', date: 'ยังมีต่อจากนี้', caption: 'to all the days ahead', note: 'นี่เป็นเพียงส่วนหนึ่งของเรื่องราวเรา ยังมีวันใหม่ ๆ สถานที่ใหม่ ๆ และความทรงจำอีกมากที่รอให้เราไปเจอด้วยกัน', rotate: '2.2deg' },
]

function PhotoPlaceholder({ index }: { index: number }) {
  const tones = ['#d7d6c4', '#e5cfc0', '#c8d4cf', '#d9c7c6', '#e3d8b9', '#c9d0dc']
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
    try {
      // กำหนดจุดเริ่มเล่นทุกครั้งที่กดเปิดเพลง
      audio.currentTime = MUSIC_START_SECONDS
      await audio.play()
      setMusicOn(true)
    } catch {
      setMusicOn(false)
    }
  }

  return <main className="page-shell">
    <div className="grain" aria-hidden="true" />
    <header className="topline">
      <span className="topline-mark"><Heart size={13} fill="currentColor" /> Tangmo <span className="name-amp">&</span> Neung</span>
      <button className="music-button" onClick={toggleMusic} aria-label={musicOn ? 'ปิดเพลง' : 'เปิดเพลง'}>
        {musicOn ? <Pause size={15} /> : <Music2 size={15} />}
        <span>{musicOn ? 'Pause song' : 'Play our song'}</span>
      </button>
      <audio ref={audioRef} src="/music/our-song.mp3" loop preload="none" onEnded={() => setMusicOn(false)} />
    </header>

    <section className={`envelope-scene ${opened ? 'is-open' : ''}`} aria-label="ซองจดหมายวันเกิด">
      <div className="scene-note note-left">made with love</div>
      <div className="scene-note note-right">for you, always </div>
      <div className="envelope-wrap">
        <div className="letter-peek"><span>To my Tangmo</span><span className="peek-line" /><small>from Neung</small></div>
        <div className="envelope-back" />
        <div className="envelope-letter-shadow" />
        <div className="envelope-front"><span className="front-fold left-fold" /><span className="front-fold right-fold" /><span className="front-fold bottom-fold" /></div>
        <div className="envelope-flap"><span className="seal"><Heart size={22} fill="currentColor" strokeWidth={1.5} /></span></div>
        <div className="envelope-stamp"><span>FOR</span><Heart size={12} fill="currentColor" /><span>YOU</span></div>
      </div>
      <div className="envelope-intro">
        <p className="eyebrow"><Sparkles size={13} /> A LITTLE SOMETHING FOR YOU</p>
        <h1>Chapter 30<br /><em>Happy Birthday, Tangmo</em></h1>
        <p className="intro-copy">22 November 2026<br />With love, Neung</p>
        <button className="open-button" onClick={() => setOpened(true)} disabled={opened}>
          {opened ? 'จดหมายเปิดแล้ว' : 'เปิดจดหมายของเธอ'} <span aria-hidden="true">↗</span>
        </button>
        <span className="tiny-hint">take your time · made just for you</span>
      </div>
      <div className="scene-flower flower-one">✳</div><div className="scene-flower flower-two">✿</div>
    </section>

    <section ref={letterRef} className={`letter-content ${opened ? 'letter-visible' : ''}`}>
      <div className="paper-sheet">
        <div className="paper-holes" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
        <div className="letter-topline"><span>TANGMO & NEUNG · OUR LITTLE STORY </span><span>22 NOVEMBER 2026</span></div>
        <div className="letter-heading">
          <p className="handwritten small-hand">Happy 30th Birthday, Tangmo!</p>
          <h2>สุขสันต์วันเกิดนะ<br /><span>แตงโม </span></h2>
        </div>
        <div className="letter-body">
          <p>ก่อนอื่นเลย อยากบอกว่า <span className="underline-wavy">พี่ภูมิใจในตัวหนูมากเลยนะ</span> และดีใจมาก ๆ ที่ได้อยู่ข้าง ๆ ได้เห็นหนูเติบโต และได้เห็นว่าหนูพยายามกับชีวิตมากแค่ไหน</p>
          <p>หนูเป็นคนเก่งนะ ตั้งใจทำงาน และจัดการหลาย ๆ อย่างได้ดีเสมอ พี่ชื่นชมในความสามารถและความพยายามของหนูมาก ๆ แต่พี่ก็อยากให้หนูจำไว้นะว่า ไม่จำเป็นต้องเก่งหรือเข้มแข็งตลอดเวลาก็ได้</p>
          <p>วันไหนเหนื่อยก็พักได้ วันไหนไม่ไหวหรือแค่อยากมีใครสักคนรับฟัง ก็ไม่ต้องเก็บทุกอย่างไว้คนเดียว พี่อยากเป็นคนที่หนูคุยด้วยได้ เป็นคนที่พร้อมรับฟัง เข้าใจ และอยู่ข้าง ๆ หนูในวันที่เป็นตัวเองได้เต็มที่ <span className="handwritten inline-hand">หนูสามารถเป็นตัวของตัวเองกับพี่ได้เสมอเลย</span></p>
        </div>
        <div className="chapter-card">
          <span className="section-number">A FEW DATES THAT MEAN A LOT</span>
          <div className="chapter-date-row">
            <div><span className="chapter-date">09.08.2026</span><strong>The day we became us.</strong><p>วันที่เราเริ่มต้นเป็นแฟนกัน และกลายเป็นส่วนหนึ่งในชีวิตของกันและกัน</p></div>
            <span className="chapter-heart"></span>
          </div>
          <div className="chapter-date-row">
            <div><span className="chapter-date">22.11.2026</span><strong>Your 30th, our next chapter.</strong><p>วันเกิดปีที่ 30 ของเธอ อีกหนึ่งช่วงเวลาที่เราอยากอยู่ข้าง ๆ และร่วมยินดีไปกับเธอ</p></div>
            <span className="chapter-heart">✳</span>
          </div>
          <div className="friday-note"><span className="handwritten">Friday Partners in Crime </span><p>ศุกร์กับศุกร์มาเจอกัน จะนิสัยคล้ายกันหรือจะดื้อพอกันก็ไม่รู้ แต่ที่แน่ ๆ มีคนให้ป่วนด้วยกันไปอีกนานเลย</p></div>
        </div>
        <div className="margin-doodle"><span></span></div>
        <div className="memory-intro">
          <span className="section-number">01 / LITTLE MOMENTS, BIG MEMORIES</span>
          <h3>เรื่องราวเล็ก ๆ ของเรา<br /><em>ที่อยากเก็บไว้ให้นานที่สุด</em></h3>
          <p>รูปบางรูปอาจเป็นแค่วันธรรมดาวันหนึ่ง แต่พอกลับมาดูทีไร ก็ทำให้เรานึกถึงช่วงเวลาดี ๆ ได้ทุกครั้ง ลองค่อย ๆ ดูนะ ยังมีอีกหลายโมเมนต์ที่พี่อยากเก็บไว้</p>
        </div>
        <div className="memory-grid">
          {memories.map((memory, index) => <div className={`memory-item memory-${index + 1}`} key={memory.image}>
            <PhotoCard memory={memory} index={index} />
            <p className="memory-note">{memory.note}</p>
          </div>)}
        </div>
        <div className="tiny-note-card"><span className="note-star">✳</span><p className="handwritten">my favorite memories<br />are the ones with you.</p><span className="note-heart"></span></div>
        <div className="wish-section">
          <span className="section-number">02 / A YEAR JUST FOR YOU</span>
          <div className="wish-doodle">✿</div>
          <h3>Here’s to Chapter 30<br /><em>ขอให้ปีนี้มีแต่เรื่องดี ๆ และมีความสุขในแบบของหนู</em></h3>
          <p>ขอให้ปีนี้เป็นอีกปีที่หนูได้ทำอะไรหลาย ๆ อย่างที่ตั้งใจ ได้เจอเรื่องราวดี ๆ ได้ลองสิ่งใหม่ ๆ และได้เห็นความพยายามของตัวเองค่อย ๆ กลายเป็นความสำเร็จ อยากให้หนูภูมิใจในตัวเองให้มาก ๆ เพราะที่ผ่านมาหนูทำอะไรได้ดีตั้งเยอะแล้ว</p>
          <p>แล้วก็อย่าลืมแบ่งเวลาให้ตัวเองด้วยนะ ไม่ต้องรีบเก่งไปซะทุกเรื่อง ไม่ต้องรีบไปให้ถึงทุกเป้าหมายในทันที บางวันแค่ได้พัก ได้กินของอร่อย ได้ออกไปเที่ยว หรือได้นอนเต็มอิ่ม ก็ถือเป็นวันที่ดีแล้ว</p>
          <p>ไม่ว่าวันไหนจะเหนื่อย จะท้อ หรือเจอเรื่องที่ไม่เป็นอย่างใจ อยากให้รู้ว่ายังมีพี่อยู่ตรงนี้นะ ไม่จำเป็นต้องเก็บทุกอย่างไว้คนเดียว จะมาบ่น มาเล่า มางอแง หรือจะเงียบ ๆ แล้วให้กอดก็ได้ทั้งนั้น พี่อาจไม่ได้มีคำตอบให้ทุกเรื่อง แต่พี่พร้อมฟังและอยู่ข้าง ๆ หนูเสมอ</p>
          <button className="wish-reveal-button" onClick={() => setShowWish(!showWish)}>{showWish ? 'ซ่อนข้อความนี้ไว้ก่อน ' : 'ยังมีอีกเรื่องที่อยากบอก…'} <span>{showWish ? '−' : '+'}</span></button>
          {showWish && <div className="secret-message"><span className="handwritten">one more thing...</span><p>อยากให้เวลาที่อยู่กับพี่ หนูไม่ต้องแบกอะไรไว้เยอะนะ ไม่ต้องพยายามทำทุกอย่างให้ดี ไม่ต้องเก่งไปซะทุกเรื่อง และไม่ต้องฝืนยิ้มในวันที่เหนื่อยหรือไม่ไหวเลย</p><p>ถ้าวันไหนเหนื่อยก็พัก ถ้าวันไหนอยากบ่นก็เล่าให้พี่ฟัง หรือถ้าไม่อยากพูดอะไรเลย แค่อยากนั่งอยู่ด้วยกันเงียบ ๆ ก็ได้ พี่อยากให้หนูรู้ว่าเวลาอยู่ตรงนี้ หนูเป็นตัวเองได้เต็มที่เลยนะ</p><p>ตั้งแต่วันที่ 9 สิงหาคมที่ผ่านมา เราก็มีเรื่องราวร่วมกันเพิ่มขึ้นเรื่อย ๆ มีทั้งวันที่สนุก วันที่หัวเราะ และวันธรรมดา ๆ ที่พอมีหนูอยู่ด้วยก็กลายเป็นวันที่พิเศษขึ้นมา พี่ดีใจนะที่เราได้มาเจอกัน และอยากมีโอกาสสร้างความทรงจำแบบนี้กับหนูไปอีกนาน ๆ</p><p>สุดท้าย อยากให้หนูรู้ไว้อย่างหนึ่งว่า หนูไม่ต้องพิสูจน์อะไรเพื่อให้พี่รักเลยนะ ไม่ว่าจะเป็นวันที่หนูเก่ง วันที่หนูเหนื่อย วันที่ทุกอย่างเป็นไปได้ดี หรือวันที่อะไร ๆ ไม่เป็นอย่างใจ พี่ก็ยังอยากมีหนูอยู่ตรงนี้เหมือนเดิม</p><p className="handwritten secret-end">รักหนูนะ — พี่หนึ่ง </p></div>}
        </div>
        <div className="signature-block">
          <p>ดีใจนะที่เราได้มาเจอกัน และได้มีเธอเป็นส่วนหนึ่งในชีวิต</p>
          <p>ขอบคุณที่ทำให้วันธรรมดาหลาย ๆ วันกลายเป็นวันที่น่าจดจำ</p>
          <p className="handwritten signature">With all my love,<br />Neung </p>
          <div className="signature-stamp"><Heart size={21} fill="currentColor" /><span>SEALED<br />WITH LOVE</span></div>
          <p className="handwritten closing-line">Our story goes on...</p>
        </div>
        <footer className="paper-footer"><span>a little page, made with love</span><span>และยังมีอีกหลายเรื่องราวที่เราอยากสร้างไปด้วยกัน </span></footer>
      </div>
      <div className="end-note"><Heart size={14} fill="currentColor" /> More memories to come, my love. <Heart size={14} fill="currentColor" /></div>
      <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowDown size={14} className="up-arrow" /> กลับไปดูซองจดหมายอีกครั้ง</button>
    </section>
    <footer className="site-footer">made with love by Neung, for Tangmo <span>✳</span></footer>
  </main>
}
