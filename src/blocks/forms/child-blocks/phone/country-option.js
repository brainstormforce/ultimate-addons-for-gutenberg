const countryOptions = [
	<option key="" data-countryCode="GB" value="+44">
		UK (+44)
	</option>,
	<option key="" data-countryCode="US" value="+1">
		USA (+1)
	</option>,
	<option key="" data-countryCode="DZ" value="+213">
		Algeria (+213)
	</option>,
	<option key="" data-countryCode="AD" value="+376">
		Andorra (+376)
	</option>,
	<option key="" data-countryCode="AO" value="+244">
		Angola (+244)
	</option>,
	<option key="" data-countryCode="AI" value="+1264">
		Anguilla (+1264)
	</option>,
	<option key="" data-countryCode="AG" value="+1268">
		Antigua &amp; Barbuda (+1268)
	</option>,
	<option key="" data-countryCode="AR" value="+54">
		Argentina (+54)
	</option>,
	<option key="" data-countryCode="AM" value="+374">
		Armenia (+374)
	</option>,
	<option key="" data-countryCode="AW" value="+297">
		Aruba (+297)
	</option>,
	<option key="" data-countryCode="AU" value="+61">
		Australia (+61)
	</option>,
	<option key="" data-countryCode="AT" value="+43">
		Austria (+43)
	</option>,
	<option key="" data-countryCode="AZ" value="+994">
		Azerbaijan (+994)
	</option>,
	<option key="" data-countryCode="BS" value="+1242">
		Bahamas (+1242)
	</option>,
	<option key="" data-countryCode="BH" value="+973">
		Bahrain (+973)
	</option>,
	<option key="" data-countryCode="BD" value="+880">
		Bangladesh (+880)
	</option>,
	<option key="" data-countryCode="BB" value="+1246">
		Barbados (+1246)
	</option>,
	<option key="" data-countryCode="BY" value="+375">
		Belarus (+375)
	</option>,
	<option key="" data-countryCode="BE" value="+32">
		Belgium (+32)
	</option>,
	<option key="" data-countryCode="BZ" value="+501">
		Belize (+501)
	</option>,
	<option key="" data-countryCode="BJ" value="+229">
		Benin (+229)
	</option>,
	<option key="" data-countryCode="BM" value="+1441">
		Bermuda (+1441)
	</option>,
	<option key="" data-countryCode="BT" value="+975">
		Bhutan (+975)
	</option>,
	<option key="" data-countryCode="BO" value="+591">
		Bolivia (+591)
	</option>,
	<option key="" data-countryCode="BA" value="+387">
		Bosnia Herzegovina (+387)
	</option>,
	<option key="" data-countryCode="BW" value="+267">
		Botswana (+267)
	</option>,
	<option key="" data-countryCode="BR" value="+55">
		Brazil (+55)
	</option>,
	<option key="" data-countryCode="BN" value="+673">
		Brunei (+673)
	</option>,
	<option key="" data-countryCode="BG" value="+359">
		Bulgaria (+359)
	</option>,
	<option key="" data-countryCode="BF" value="+226">
		Burkina Faso (+226)
	</option>,
	<option key="" data-countryCode="BI" value="+257">
		Burundi (+257)
	</option>,
	<option key="" data-countryCode="KH" value="+855">
		Cambodia (+855)
	</option>,
	<option key="" data-countryCode="CM" value="+237">
		Cameroon (+237)
	</option>,
	<option key="" data-countryCode="CA" value="+1">
		Canada (+1)
	</option>,
	<option key="" data-countryCode="CV" value="+238">
		Cape Verde Islands (+238)
	</option>,
	<option key="" data-countryCode="KY" value="+1345">
		Cayman Islands (+1345)
	</option>,
	<option key="" data-countryCode="CF" value="+236">
		Central African Republic (+236)
	</option>,
	<option key="" data-countryCode="CL" value="+56">
		Chile (+56)
	</option>,
	<option key="" data-countryCode="CN" value="+86">
		China (+86)
	</option>,
	<option key="" data-countryCode="CO" value="+57">
		Colombia (+57)
	</option>,
	<option key="" data-countryCode="KM" value="+269">
		Comoros (+269)
	</option>,
	<option key="" data-countryCode="CG" value="+242">
		Congo (+242)
	</option>,
	<option key="" data-countryCode="CK" value="+682">
		Cook Islands (+682)
	</option>,
	<option key="" data-countryCode="CR" value="+506">
		Costa Rica (+506)
	</option>,
	<option key="" data-countryCode="HR" value="+385">
		Croatia (+385)
	</option>,
	<option key="" data-countryCode="CU" value="+53">
		Cuba (+53)
	</option>,
	<option key="" data-countryCode="CY" value="+90392">
		Cyprus North (+90392)
	</option>,
	<option key="" data-countryCode="CY" value="+357">
		Cyprus South (+357)
	</option>,
	<option key="" data-countryCode="CZ" value="+42">
		Czech Republic (+42)
	</option>,
	<option key="" data-countryCode="DK" value="+45">
		Denmark (+45)
	</option>,
	<option key="" data-countryCode="DJ" value="+253">
		Djibouti (+253)
	</option>,
	<option key="" data-countryCode="DM" value="+1809">
		Dominica (+1809)
	</option>,
	<option key="" data-countryCode="DO" value="+1809">
		Dominican Republic (+1809)
	</option>,
	<option key="" data-countryCode="EC" value="+593">
		Ecuador (+593)
	</option>,
	<option key="" data-countryCode="EG" value="+20">
		Egypt (+20)
	</option>,
	<option key="" data-countryCode="SV" value="+503">
		El Salvador (+503)
	</option>,
	<option key="" data-countryCode="GQ" value="+240">
		Equatorial Guinea (+240)
	</option>,
	<option key="" data-countryCode="ER" value="+291">
		Eritrea (+291)
	</option>,
	<option key="" data-countryCode="EE" value="+372">
		Estonia (+372)
	</option>,
	<option key="" data-countryCode="ET" value="+251">
		Ethiopia (+251)
	</option>,
	<option key="" data-countryCode="FK" value="+500">
		Falkland Islands (+500)
	</option>,
	<option key="" data-countryCode="FO" value="+298">
		Faroe Islands (+298)
	</option>,
	<option key="" data-countryCode="FJ" value="+679">
		Fiji (+679)
	</option>,
	<option key="" data-countryCode="FI" value="+358">
		Finland (+358)
	</option>,
	<option key="" data-countryCode="FR" value="+33">
		France (+33)
	</option>,
	<option key="" data-countryCode="GF" value="+594">
		French Guiana (+594)
	</option>,
	<option key="" data-countryCode="PF" value="+689">
		French Polynesia (+689)
	</option>,
	<option key="" data-countryCode="GA" value="+241">
		Gabon (+241)
	</option>,
	<option key="" data-countryCode="GM" value="+220">
		Gambia (+220)
	</option>,
	<option key="" data-countryCode="GE" value="+7880">
		Georgia (+7880)
	</option>,
	<option key="" data-countryCode="DE" value="+49">
		Germany (+49)
	</option>,
	<option key="" data-countryCode="GH" value="+233">
		Ghana (+233)
	</option>,
	<option key="" data-countryCode="GI" value="+350">
		Gibraltar (+350)
	</option>,
	<option key="" data-countryCode="GR" value="+30">
		Greece (+30)
	</option>,
	<option key="" data-countryCode="GL" value="+299">
		Greenland (+299)
	</option>,
	<option key="" data-countryCode="GD" value="+1473">
		Grenada (+1473)
	</option>,
	<option key="" data-countryCode="GP" value="+590">
		Guadeloupe (+590)
	</option>,
	<option key="" data-countryCode="GU" value="+671">
		Guam (+671)
	</option>,
	<option key="" data-countryCode="GT" value="+502">
		Guatemala (+502)
	</option>,
	<option key="" data-countryCode="GN" value="+224">
		Guinea (+224)
	</option>,
	<option key="" data-countryCode="GW" value="+245">
		Guinea - Bissau (+245)
	</option>,
	<option key="" data-countryCode="GY" value="+592">
		Guyana (+592)
	</option>,
	<option key="" data-countryCode="HT" value="+509">
		Haiti (+509)
	</option>,
	<option key="" data-countryCode="HN" value="+504">
		Honduras (+504)
	</option>,
	<option key="" data-countryCode="HK" value="+852">
		Hong Kong (+852)
	</option>,
	<option key="" data-countryCode="HU" value="+36">
		Hungary (+36)
	</option>,
	<option key="" data-countryCode="IS" value="+354">
		Iceland (+354)
	</option>,
	<option key="" data-countryCode="IN" value="+91">
		India (+91)
	</option>,
	<option key="" data-countryCode="ID" value="+62">
		Indonesia (+62)
	</option>,
	<option key="" data-countryCode="IR" value="+98">
		Iran (+98)
	</option>,
	<option key="" data-countryCode="IQ" value="+964">
		Iraq (+964)
	</option>,
	<option key="" data-countryCode="IE" value="+353">
		Ireland (+353)
	</option>,
	<option key="" data-countryCode="IL" value="+972">
		Israel (+972)
	</option>,
	<option key="" data-countryCode="IT" value="+39">
		Italy (+39)
	</option>,
	<option key="" data-countryCode="JM" value="+1876">
		Jamaica (+1876)
	</option>,
	<option key="" data-countryCode="JP" value="+81">
		Japan (+81)
	</option>,
	<option key="" data-countryCode="JO" value="+962">
		Jordan (+962)
	</option>,
	<option key="" data-countryCode="KZ" value="+7">
		Kazakhstan (+7)
	</option>,
	<option key="" data-countryCode="KE" value="+254">
		Kenya (+254)
	</option>,
	<option key="" data-countryCode="KI" value="+686">
		Kiribati (+686)
	</option>,
	<option key="" data-countryCode="KP" value="+850">
		Korea North (+850)
	</option>,
	<option key="" data-countryCode="KR" value="+82">
		Korea South (+82)
	</option>,
	<option key="" data-countryCode="KW" value="+965">
		Kuwait (+965)
	</option>,
	<option key="" data-countryCode="KG" value="+996">
		Kyrgyzstan (+996)
	</option>,
	<option key="" data-countryCode="LA" value="+856">
		Laos (+856)
	</option>,
	<option key="" data-countryCode="LV" value="+371">
		Latvia (+371)
	</option>,
	<option key="" data-countryCode="LB" value="+961">
		Lebanon (+961)
	</option>,
	<option key="" data-countryCode="LS" value="+266">
		Lesotho (+266)
	</option>,
	<option key="" data-countryCode="LR" value="+231">
		Liberia (+231)
	</option>,
	<option key="" data-countryCode="LY" value="+218">
		Libya (+218)
	</option>,
	<option key="" data-countryCode="LI" value="+417">
		Liechtenstein (+417)
	</option>,
	<option key="" data-countryCode="LT" value="+370">
		Lithuania (+370)
	</option>,
	<option key="" data-countryCode="LU" value="+352">
		Luxembourg (+352)
	</option>,
	<option key="" data-countryCode="MO" value="+853">
		Macao (+853)
	</option>,
	<option key="" data-countryCode="MK" value="+389">
		Macedonia (+389)
	</option>,
	<option key="" data-countryCode="MG" value="+261">
		Madagascar (+261)
	</option>,
	<option key="" data-countryCode="MW" value="+265">
		Malawi (+265)
	</option>,
	<option key="" data-countryCode="MY" value="+60">
		Malaysia (+60)
	</option>,
	<option key="" data-countryCode="MV" value="+960">
		Maldives (+960)
	</option>,
	<option key="" data-countryCode="ML" value="+223">
		Mali (+223)
	</option>,
	<option key="" data-countryCode="MT" value="+356">
		Malta (+356)
	</option>,
	<option key="" data-countryCode="MH" value="+692">
		Marshall Islands (+692)
	</option>,
	<option key="" data-countryCode="MQ" value="+596">
		Martinique (+596)
	</option>,
	<option key="" data-countryCode="MR" value="+222">
		Mauritania (+222)
	</option>,
	<option key="" data-countryCode="YT" value="+269">
		Mayotte (+269)
	</option>,
	<option key="" data-countryCode="MX" value="+52">
		Mexico (+52)
	</option>,
	<option key="" data-countryCode="FM" value="+691">
		Micronesia (+691)
	</option>,
	<option key="" data-countryCode="MD" value="+373">
		Moldova (+373)
	</option>,
	<option key="" data-countryCode="MC" value="+377">
		Monaco (+377)
	</option>,
	<option key="" data-countryCode="MN" value="+976">
		Mongolia (+976)
	</option>,
	<option key="" data-countryCode="MS" value="+1664">
		Montserrat (+1664)
	</option>,
	<option key="" data-countryCode="MA" value="+212">
		Morocco (+212)
	</option>,
	<option key="" data-countryCode="MZ" value="+258">
		Mozambique (+258)
	</option>,
	<option key="" data-countryCode="MN" value="+95">
		Myanmar (+95)
	</option>,
	<option key="" data-countryCode="NA" value="+264">
		Namibia (+264)
	</option>,
	<option key="" data-countryCode="NR" value="+674">
		Nauru (+674)
	</option>,
	<option key="" data-countryCode="NP" value="+977">
		Nepal (+977)
	</option>,
	<option key="" data-countryCode="NL" value="+31">
		Netherlands (+31)
	</option>,
	<option key="" data-countryCode="NC" value="+687">
		New Caledonia (+687)
	</option>,
	<option key="" data-countryCode="NZ" value="+64">
		New Zealand (+64)
	</option>,
	<option key="" data-countryCode="NI" value="+505">
		Nicaragua (+505)
	</option>,
	<option key="" data-countryCode="NE" value="+227">
		Niger (+227)
	</option>,
	<option key="" data-countryCode="NG" value="+234">
		Nigeria (+234)
	</option>,
	<option key="" data-countryCode="NU" value="+683">
		Niue (+683)
	</option>,
	<option key="" data-countryCode="NF" value="+672">
		Norfolk Islands (+672)
	</option>,
	<option key="" data-countryCode="NP" value="+670">
		Northern Marianas (+670)
	</option>,
	<option key="" data-countryCode="NO" value="+47">
		Norway (+47)
	</option>,
	<option key="" data-countryCode="OM" value="+968">
		Oman (+968)
	</option>,
	<option key="" data-countryCode="PW" value="+680">
		Palau (+680)
	</option>,
	<option key="" data-countryCode="PA" value="+507">
		Panama (+507)
	</option>,
	<option key="" data-countryCode="PG" value="+675">
		Papua New Guinea (+675)
	</option>,
	<option key="" data-countryCode="PY" value="+595">
		Paraguay (+595)
	</option>,
	<option key="" data-countryCode="PE" value="+51">
		Peru (+51)
	</option>,
	<option key="" data-countryCode="PH" value="+63">
		Philippines (+63)
	</option>,
	<option key="" data-countryCode="PL" value="+48">
		Poland (+48)
	</option>,
	<option key="" data-countryCode="PT" value="+351">
		Portugal (+351)
	</option>,
	<option key="" data-countryCode="PR" value="+1787">
		Puerto Rico (+1787)
	</option>,
	<option key="" data-countryCode="QA" value="+974">
		Qatar (+974)
	</option>,
	<option key="" data-countryCode="RE" value="+262">
		Reunion (+262)
	</option>,
	<option key="" data-countryCode="RO" value="+40">
		Romania (+40)
	</option>,
	<option key="" data-countryCode="RU" value="+7">
		Russia (+7)
	</option>,
	<option key="" data-countryCode="RW" value="+250">
		Rwanda (+250)
	</option>,
	<option key="" data-countryCode="SM" value="+378">
		San Marino (+378)
	</option>,
	<option key="" data-countryCode="ST" value="+239">
		Sao Tome &amp; Principe (+239)
	</option>,
	<option key="" data-countryCode="SA" value="+966">
		Saudi Arabia (+966)
	</option>,
	<option key="" data-countryCode="SN" value="+221">
		Senegal (+221)
	</option>,
	<option key="" data-countryCode="CS" value="+381">
		Serbia (+381)
	</option>,
	<option key="" data-countryCode="SC" value="+248">
		Seychelles (+248)
	</option>,
	<option key="" data-countryCode="SL" value="+232">
		Sierra Leone (+232)
	</option>,
	<option key="" data-countryCode="SG" value="+65">
		Singapore (+65)
	</option>,
	<option key="" data-countryCode="SK" value="+421">
		Slovak Republic (+421)
	</option>,
	<option key="" data-countryCode="SI" value="+386">
		Slovenia (+386)
	</option>,
	<option key="" data-countryCode="SB" value="+677">
		Solomon Islands (+677)
	</option>,
	<option key="" data-countryCode="SO" value="+252">
		Somalia (+252)
	</option>,
	<option key="" data-countryCode="ZA" value="+27">
		South Africa (+27)
	</option>,
	<option key="" data-countryCode="ES" value="+34">
		Spain (+34)
	</option>,
	<option key="" data-countryCode="LK" value="+94">
		Sri Lanka (+94)
	</option>,
	<option key="" data-countryCode="SH" value="+290">
		St. Helena (+290)
	</option>,
	<option key="" data-countryCode="KN" value="+1869">
		St. Kitts (+1869)
	</option>,
	<option key="" data-countryCode="SC" value="+1758">
		St. Lucia (+1758)
	</option>,
	<option key="" data-countryCode="SD" value="+249">
		Sudan (+249)
	</option>,
	<option key="" data-countryCode="SR" value="+597">
		Suriname (+597)
	</option>,
	<option key="" data-countryCode="SZ" value="+268">
		Swaziland (+268)
	</option>,
	<option key="" data-countryCode="SE" value="+46">
		Sweden (+46)
	</option>,
	<option key="" data-countryCode="CH" value="+41">
		Switzerland (+41)
	</option>,
	<option key="" data-countryCode="SI" value="+963">
		Syria (+963)
	</option>,
	<option key="" data-countryCode="TW" value="+886">
		Taiwan (+886)
	</option>,
	<option key="" data-countryCode="TJ" value="+7">
		Tajikstan (+7)
	</option>,
	<option key="" data-countryCode="TH" value="+66">
		Thailand (+66)
	</option>,
	<option key="" data-countryCode="TG" value="+228">
		Togo (+228)
	</option>,
	<option key="" data-countryCode="TO" value="+676">
		Tonga (+676)
	</option>,
	<option key="" data-countryCode="TT" value="+1868">
		Trinidad &amp; Tobago (+1868)
	</option>,
	<option key="" data-countryCode="TN" value="+216">
		Tunisia (+216)
	</option>,
	<option key="" data-countryCode="TR" value="+90">
		Turkey (+90)
	</option>,
	<option key="" data-countryCode="TM" value="+7">
		Turkmenistan (+7)
	</option>,
	<option key="" data-countryCode="TM" value="+993">
		Turkmenistan (+993)
	</option>,
	<option key="" data-countryCode="TC" value="+1649">
		Turks &amp; Caicos Islands (+1649)
	</option>,
	<option key="" data-countryCode="TV" value="+688">
		Tuvalu (+688)
	</option>,
	<option key="" data-countryCode="UG" value="+256">
		Uganda (+256)
	</option>,
	<option key="" data-countryCode="UA" value="+380">
		Ukraine (+380)
	</option>,
	<option key="" data-countryCode="AE" value="+971">
		United Arab Emirates (+971)
	</option>,
	<option key="" data-countryCode="UY" value="+598">
		Uruguay (+598)
	</option>,
	<option key="" data-countryCode="UZ" value="+7">
		Uzbekistan (+7)
	</option>,
	<option key="" data-countryCode="VU" value="+678">
		Vanuatu (+678)
	</option>,
	<option key="" data-countryCode="VA" value="+379">
		Vatican City (+379)
	</option>,
	<option key="" data-countryCode="VE" value="+58">
		Venezuela (+58)
	</option>,
	<option key="" data-countryCode="VN" value="+84">
		Vietnam (+84)
	</option>,
	<option key="" data-countryCode="VG" value="+84">
		Virgin Islands - British (+1284)
	</option>,
	<option key="" data-countryCode="VI" value="+84">
		Virgin Islands - US (+1340)
	</option>,
	<option key="" data-countryCode="WF" value="+681">
		Wallis &amp; Futuna (+681)
	</option>,
	<option key="" data-countryCode="YE" value="+969">
		Yemen (North)(+969)
	</option>,
	<option key="" data-countryCode="YE" value="+967">
		Yemen (South)(+967)
	</option>,
	<option key="" data-countryCode="ZM" value="+260">
		Zambia (+260)
	</option>,
	<option key="" data-countryCode="ZW" value="+263">
		Zimbabwe (+263)
	</option>,
];

export default countryOptions;
