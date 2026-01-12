const fs = require('fs');
const path = require('path');

const TARGET_DATE = new Date('2026-06-01T00:00:00Z');
const README_PATH = path.join(__dirname, '../README.md');

function updateCountdown() {
  const now = new Date();
  
  // Calculate difference in days
  const diffTime = TARGET_DATE - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  let statusText = '';
  if (diffDays > 0) {
    statusText = `planning to move to a new country in ${diffDays} days`;
  } else {
    statusText = 'currently away since 2026-06-01';
  }

  console.log(`Current date: ${now.toISOString()}`);
  console.log(`Target date: ${TARGET_DATE.toISOString()}`);
  console.log(`Calculated status: ${statusText}`);

  try {
    let content = fs.readFileSync(README_PATH, 'utf8');
    
    const startTag = '<!-- COUNTDOWN_START -->';
    const endTag = '<!-- COUNTDOWN_END -->';
    
    const regex = new RegExp(`${startTag}[\\s\\S]*?${endTag}`, 'g');
    const newContent = content.replace(regex, `${startTag}${statusText}${endTag}`);
    
    if (content === newContent) {
      console.log('No changes needed or tags not found.');
    } else {
      fs.writeFileSync(README_PATH, newContent, 'utf8');
      console.log('Successfully updated README.md');
    }
  } catch (error) {
    console.error('Error updating README.md:', error);
    process.exit(1);
  }
}

updateCountdown();
