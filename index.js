// http://localhost:41416/
// … and then view console log.

gist: 'https://gist.githubusercontent.com/mhulse/93191698219b33471883a4846dd47809/raw/keys.json',

command: 'lsappinfo info -only bundlepath `lsappinfo front`',

refreshFrequency: '5s',

style: [
	
	'  primary = #000',
	'  secondary = #fff',
	
	'  &',
	'  & *',
	'  & *:before',
	'  & *:after',
	'    box-sizing: border-box',
	
	'  top: 10px',
	'  left: 10px',
	
	'  kbd',
	'    font-family: "Lucida Grande"',
	'    font-weight: 400',
	'    font-size: smaller',
	'    background: rgba(primary, .2)',
	'    padding: .2em .5em',
	'    border-radius: 3px',
	'    display: inline-block',
	
	'  kbd kbd',
	'    font-size: inherit',
	'    color: inherit',
	'    text-shadow: none',
	'    background: transparent',
	'    border: 0',
	'    margin: 0',
	'    padding: 0',
	'    display: inline',
	'    box-shadow: none',
	'    border-radius: 0',
	
	'  a',
	'  a:visited',
	'  a:visited:hover',
	'  a:focus',
	'  a:focus:hover',
	'  a:hover',
	'  a:active',
	'    color: inherit',
	'    text-decoration: none',
	
	'  span',
	'    display: block',
	
	'  [keys]',
	'    margin-bottom: 5px',
	
	'  [and]',
	'    display: inline-block',
	'    text-transform: uppercase',
	'    margin: 0 5px',
	
	'  [shortcuts]',
	'    margin: -10px 0 0 -10px',
	'      & > :first-child',
	'        margin-top: 0',
	'      & > :last-child',
	'        margin-bottom: 0',
	
	'  [shortcut]',
	'    padding: 10px',
	'    display: block',
	'    margin: 10px 0 0 10px',
	'    width: 100%',
	'    font-size: 14px',
	'    font-family: Helvetica Neue',
	'    font-weight: 200',
	'    letter-spacing: .05em',
	'    color: rgba(primary, .85)',
	'    border: 2px solid rgba(secondary, .3)',
	'    border-radius: 3px',
	'    background: rgba(secondary, .2)',
	'    -webkit-backdrop-filter: blur(10px)',
	
	'  [title]',
	'    font-size: 18px',
	
].join('\n'),

json: '',

app: function(output) {
	
	return output
		.replace(/["']/g, '')
		.split('/')
		.pop()
		.split('.')
		.shift()
		.toLowerCase();
	
},

render: function() {
	
	var that = this;
	
	that.run('curl -sS ' + that.gist, function(result, output) {
		
		that.json = $.parseJSON(output);
		
	});
	
	return '<div shortcuts></div>';
	
},

check: function(obj, key) {
	
	return (obj.hasOwnProperty(key) && (obj[key] !== undefined) && obj[key].length);
	
},

update: function(output, domEl) {
	
	var that = this;
	var active;
	var json = that.json;
	var dom = $(domEl).children('[shortcuts]');
	
	// Remote data loaded?
	if ($.isPlainObject(json)) {
		
		active = that.app(output);
		
		if (that.check(json, active)) {
			
			dom
				.html('')
				.parent()
				.show();
			
			$.each(json[active], function(key, val) {
				
				var shortcut = that.check(val, 'docs');
				var keys = that.check(val, 'keys');
				var combo = '';
				var undo = '';
				
				if (keys) {
					
					if (val.keys[0].constructor === Array) {
						
						combo = ('<kbd>' + val.keys[0].join('</kbd> + <kbd>') + '</kbd>');
						
						if (val.keys[1].constructor === Array) {
							
							undo = (' <b and>|</b> <kbd>' + val.keys[1].join('</kbd> + <kbd>') + '</kbd>');
							
						}
						
						combo = combo + undo;
						
					} else {
						
						combo = ('<kbd>' + val.keys.join('</kbd> + <kbd>') + '</kbd>');
						
					}
					
				}
				
				dom.append([
					((shortcut) ? '<a shortcut href="' + val.docs + '">' : '<span shortcut>'),
						(combo.length ? ('<span keys>' + combo + '</span>') : ''),
						(that.check(val, 'title') ? ('<span title>' + val.title + '</span>') : ''),
						(that.check(val, 'description') ? ('<span description>' + val.description + '</span>') : ''),
						(that.check(val, 'menu') ? ('<span menu>' + val.menu.join(' <small>➜</small> ') + '</span>') : ''),
					((shortcut) ? '</a>' : '</span>'),
				].join('\n'));
				
			});
			
		} else if (active.indexOf('finder') == -1) {
			
			dom
				.parent()
				.hide();
			
		}
		
	}
	
},
