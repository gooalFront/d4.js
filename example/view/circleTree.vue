<template>
  <div id="CircleTree-chart">
    <h3>环树图</h3>
    <el-button size="small" @click="redraw">Redraw</el-button>
    <el-button size="small" @click="deepRedraw">deepRedraw</el-button>
    <el-button size="small" @click="single">单选</el-button>
	<el-button size="small" @click="multiple">多选</el-button>
    <input type="color" ref="inputColor" @change="colorChange">
    <div class="chart-content" id="chart-CircleTree"></div>
    <codemirror ref="code" v-model="code" :options="options"></codemirror>
  </div>
</template>

<script>
export default {
  name: "circleTreeChart",
  computed: {
    options: function() {
      return {
        mode: "javascript",
        tabSize: 2,
        lineNumbers: true,
        lineWrapping: true,
        viewportMargin: Infinity,
        showCursorWhenSelecting: true,
        readOnly: true,
        theme: "neo",
        extraKeys: { "Ctrl-Space": "autocomplete" }
      };
    }
  },
  data() {
    return {
      code: ` `,
	  chart: null,
      config: {
        chart: {
          title: "环树图",
          dblclick: function(event) {
            var name = prompt("请输入需要修改的标题", "");
            if (name) {
              this.setChartTitle(name);
              this.updateTitle();
            }
          },
          mouseover: function(event, titleObj) {
            titleObj
              .attr("fill", "blue")
              .append("title")
              .text("双击修改标题");
          },
          mouseout: function(event, titleObj) {
            titleObj.attr("fill", "#333");
            titleObj.select("title").remove();
          },
          el: "#chart-CircleTree",
          type: "circleTree",
          data: [],
          colors: ["#FF8B8B", "#167C80", "#005397", "#FACA0C", "#F3C9DD", "#0BBCD6", "#BFB5D7", "#BEA1A5", "#0E38B1", "#A6CFE2", "#371722", "#C7C6C4", "#DABAAE", "#DB9AAD", "#F1C3B8", "#EF3E4A", "#C0C2CE", "#EEC0DB", "#B6CAC0", "#C5BEAA", "#FDF06F", "#EDB5BD", "#17C37B", "#2C3979", "#1B1D1C", "#E88565", "#FFEFE5", "#F4C7EE", "#77EEDF", "#E57066", "#FBFE56", "#A7BBC3", "#3C485E", "#055A5B", "#178E96", "#D3E8E1", "#CBA0AA", "#9C9CDD", "#20AD65", "#E75153", "#4F3A4B", "#112378", "#A82B35", "#FEDCCC", "#00B28B", "#9357A9", "#C6D7C7", "#B1FDEB", "#BEF6E9", "#776EA7", "#EAEAEA", "#EF303B", "#1812D6", "#FFFDE7", "#D1E9E3", "#7DE0E6", "#3A745F", "#CE7182", "#340B0B", "#F8EBEE", "#FF9966", "#002CFC", "#75FFC0", "#FB9B2A", "#FF8FA4", "#000000", "#083EA7", "#674B7C", "#19AAD1", "#12162D", "#121738", "#0C485E", "#FC3C2D", "#864BFF", "#EF5B09", "#97B8A3", "#FFD101", "#C26B6A", "#E3E3E3", "#FF4C06", "#CDFF06", "#0C485E", "#1F3B34", "#384D9D", "#E10000", "#F64A00", "#89937A", "#C39D63", "#00FDFF", "#B18AE0", "#96D0FF", "#3C225F", "#FF6B61", "#EEB200", "#F9F7E8", "#EED974", "#F0CF61", "#B7E3E4"],
		  showText: true,
		  line:{
			  click:(link,links,d)=>{
				  this.$refs.inputColor.click();
				  this.curLinks=links;
				//   d3.select(link).style('stroke','red');
				//  d3.selectAll(links).style('stroke','red');
			  }
		  },
          //   enableChartSelect:true,
          //   selectedModule: "",
          onselect: data => {
            console.log(data);
          }
        },
        tooltip: function(d) {
          return `<span>name：${d.name}</span>`;
        }
      }
    };
  },
  mounted() {
    var data = {
		"name": "TN212",
		"children": [
			{
				"name": "TN210",
				"size": 85.0,
				"children": [
					{
						"name": "TN208",
						"size": 88.0,
						"children": [
							{
								"name": "TN204",
								"size": 82.0,
								"children": [
									{
										"name": "TN197",
										"size": 87.0,
										"children": [
											{
												"name": "TN187",
												"size": 89.0,
												"children": [
													{
														"name": "TN177",
														"size": 84.0,
														"children": [
															{
																"name": "TN166",
																"size": 90.0,
																"children": [
																	{
																		"name": "TN152",
																		"size": 95.0,
																		"children": [
																			{
																				"name": "VQK136",
																				"anno": []
																			},
																			{
																				"name": "VQK178",
																				"anno": []
																			}
																		]
																	},
																	{
																		"name": "TN153",
																		"size": 79.0,
																		"children": [
																			{
																				"name": "VQK177",
																				"anno": []
																			},
																			{
																				"name": "TN144",
																				"size": 92.0,
																				"children": [
																					{
																						"name": "VQK141",
																						"anno": []
																					},
																					{
																						"name": "TN139",
																						"size": 92.0,
																						"children": [
																							{
																								"name": "VQK143",
																								"anno": []
																							},
																							{
																								"name": "VQK77",
																								"anno": []
																							}
																						]
																					}
																				]
																			}
																		]
																	}
																]
															},
															{
																"name": "TN167",
																"size": 81.0,
																"children": [
																	{
																		"name": "TN154",
																		"size": 80.0,
																		"children": [
																			{
																				"name": "VQK21",
																				"anno": [
																					{
																						"name": "cultivar",
																						"value": "PI 479769"
																					},
																					{
																						"name": "Narrative",
																						"value": ""
																					},
																					{
																						"name": "Plant Name",
																						"value": "Long 79-5801"
																					},
																					{
																						"name": "Life form",
																						"value": "Annual"
																					},
																					{
																						"name": "Pedigree",
																						"value": ""
																					},
																					{
																						"name": "Improvement status",
																						"value": "Wild"
																					},
																					{
																						"name": "Reproductive uniformity",
																						"value": "Pureline"
																					},
																					{
																						"name": "Locality",
																						"value": "Heilongjiang, China "
																					},
																					{
																						"name": "Coordinates",
																						"value": "Latitude: 48 deg. 28 min. 33 sec. North (48.47607990), Longitude: 127 deg. 58 min. 19 sec. East (127.97199610)"
																					}
																				]
																			},
																			{
																				"name": "VQK78",
																				"anno": []
																			}
																		]
																	},
																	{
																		"name": "TN155",
																		"size": 90.0,
																		"children": [
																			{
																				"name": "VQK181",
																				"anno": []
																			},
																			{
																				"name": "TN145",
																				"size": 82.0,
																				"children": [
																					{
																						"name": "VQK137",
																						"anno": []
																					},
																					{
																						"name": "VQK188",
																						"anno": []
																					}
																				]
																			}
																		]
																	}
																]
															}
														]
													},
													{
														"name": "TN178",
														"size": 83.0,
														"children": [
															{
																"name": "TN168",
																"size": 80.0,
																"children": [
																	{
																		"name": "TN156",
																		"size": 84.0,
																		"children": [
																			{
																				"name": "VQK201",
																				"anno": []
																			},
																			{
																				"name": "TN146",
																				"size": 44.0,
																				"children": [
																					{
																						"name": "VQK15",
																						"anno": [
																							{
																								"name": "cultivar",
																								"value": "PI 522182B"
																							},
																							{
																								"name": "Narrative",
																								"value": "Flowers violet. Pubescence brown. Seeds black with yellow cotyledons, 1.50g/100. Protein 48.36%. Oil 6.63%"
																							},
																							{
																								"name": "Plant Name",
																								"value": "ZYD 253"
																							},
																							{
																								"name": "Life form",
																								"value": "Annual"
																							},
																							{
																								"name": "Pedigree",
																								"value": ""
																							},
																							{
																								"name": "Improvement status",
																								"value": "Wild"
																							},
																							{
																								"name": "Reproductive uniformity",
																								"value": "Pureline"
																							},
																							{
																								"name": "Locality",
																								"value": "Heilongjiang, China "
																							},
																							{
																								"name": "Coordinates",
																								"value": "Latitude: 48 deg. 28 min. 33 sec. North (48.47607990), Longitude: 127 deg. 58 min. 19 sec. East (127.97199610)"
																							}
																						]
																					},
																					{
																						"name": "VQK192",
																						"anno": []
																					}
																				]
																			}
																		]
																	},
																	{
																		"name": "VQK25",
																		"anno": [
																			{
																				"name": "cultivar",
																				"value": "PI 464935"
																			},
																			{
																				"name": "Narrative",
																				"value": ""
																			},
																			{
																				"name": "Plant Name",
																				"value": "81-200002"
																			},
																			{
																				"name": "Life form",
																				"value": "Annual"
																			},
																			{
																				"name": "Pedigree",
																				"value": ""
																			},
																			{
																				"name": "Improvement status",
																				"value": "Wild"
																			},
																			{
																				"name": "Reproductive uniformity",
																				"value": "Pureline"
																			},
																			{
																				"name": "Locality",
																				"value": "Jiangsu, China "
																			},
																			{
																				"name": "Coordinates",
																				"value": ""
																			}
																		]
																	}
																]
															},
															{
																"name": "VQK211",
																"anno": []
															}
														]
													}
												]
											},
											{
												"name": "TN188",
												"size": 97.0,
												"children": [
													{
														"name": "TN179",
														"size": 89.0,
														"children": [
															{
																"name": "TN169",
																"size": 20.0,
																"children": [
																	{
																		"name": "TN157",
																		"size": 84.0,
																		"children": [
																			{
																				"name": "VQK208",
																				"anno": []
																			},
																			{
																				"name": "VQK63",
																				"anno": []
																			}
																		]
																	},
																	{
																		"name": "TN158",
																		"size": 92.0,
																		"children": [
																			{
																				"name": "TN147",
																				"size": 91.0,
																				"children": [
																					{
																						"name": "VQK51",
																						"anno": []
																					},
																					{
																						"name": "VQK68",
																						"anno": []
																					}
																				]
																			},
																			{
																				"name": "TN148",
																				"size": 56.99999999999999,
																				"children": [
																					{
																						"name": "TN140",
																						"size": 76.0,
																						"children": [
																							{
																								"name": "TN132",
																								"size": 86.0,
																								"children": [
																									{
																										"name": "VQK82",
																										"anno": []
																									},
																									{
																										"name": "TN124",
																										"size": 94.0,
																										"children": [
																											{
																												"name": "VQK214",
																												"anno": []
																											},
																											{
																												"name": "VQK86",
																												"anno": []
																											}
																										]
																									}
																								]
																							},
																							{
																								"name": "TN133",
																								"size": 88.0,
																								"children": [
																									{
																										"name": "VQK105",
																										"anno": []
																									},
																									{
																										"name": "TN125",
																										"size": 44.0,
																										"children": [
																											{
																												"name": "TN114",
																												"size": 88.0,
																												"children": [
																													{
																														"name": "VQK56",
																														"anno": []
																													},
																													{
																														"name": "TN103",
																														"size": 91.0,
																														"children": [
																															{
																																"name": "VQK49",
																																"anno": []
																															},
																															{
																																"name": "VQK50",
																																"anno": []
																															}
																														]
																													}
																												]
																											},
																											{
																												"name": "VQK89",
																												"anno": []
																											}
																										]
																									}
																								]
																							}
																						]
																					},
																					{
																						"name": "VQK209",
																						"anno": []
																					}
																				]
																			}
																		]
																	}
																]
															},
															{
																"name": "TN170",
																"size": 70.0,
																"children": [
																	{
																		"name": "VQK153",
																		"anno": []
																	},
																	{
																		"name": "TN159",
																		"size": 88.0,
																		"children": [
																			{
																				"name": "VQK191",
																				"anno": []
																			},
																			{
																				"name": "VQK22",
																				"anno": [
																					{
																						"name": "cultivar",
																						"value": "PI 479752"
																					},
																					{
																						"name": "Narrative",
																						"value": ""
																					},
																					{
																						"name": "Plant Name",
																						"value": "GD 50388-2"
																					},
																					{
																						"name": "Life form",
																						"value": "Annual"
																					},
																					{
																						"name": "Pedigree",
																						"value": ""
																					},
																					{
																						"name": "Improvement status",
																						"value": "Wild"
																					},
																					{
																						"name": "Reproductive uniformity",
																						"value": "Pureline"
																					},
																					{
																						"name": "Locality",
																						"value": "Jilin, China "
																					},
																					{
																						"name": "Coordinates",
																						"value": ""
																					}
																				]
																			}
																		]
																	}
																]
															}
														]
													},
													{
														"name": "TN180",
														"size": 76.0,
														"children": [
															{
																"name": "VQK161",
																"anno": []
															},
															{
																"name": "TN171",
																"size": 88.0,
																"children": [
																	{
																		"name": "TN160",
																		"size": 79.0,
																		"children": [
																			{
																				"name": "TN149",
																				"size": 14.000000000000002,
																				"children": [
																					{
																						"name": "VQK169",
																						"anno": []
																					},
																					{
																						"name": "VQK180",
																						"anno": []
																					}
																				]
																			},
																			{
																				"name": "VQK186",
																				"anno": []
																			}
																		]
																	},
																	{
																		"name": "VQK36",
																		"anno": []
																	}
																]
															}
														]
													}
												]
											}
										]
									},
									{
										"name": "TN198",
										"size": 32.0,
										"children": [
											{
												"name": "TN189",
												"size": 88.0,
												"children": [
													{
														"name": "VQK75",
														"anno": []
													},
													{
														"name": "VQK84",
														"anno": []
													}
												]
											},
											{
												"name": "TN190",
												"size": 83.0,
												"children": [
													{
														"name": "TN181",
														"size": 76.0,
														"children": [
															{
																"name": "VQK107",
																"anno": []
															},
															{
																"name": "VQK73",
																"anno": []
															}
														]
													},
													{
														"name": "TN182",
														"size": 84.0,
														"children": [
															{
																"name": "TN172",
																"size": 87.0,
																"children": [
																	{
																		"name": "VQK71",
																		"anno": []
																	},
																	{
																		"name": "TN161",
																		"size": 92.0,
																		"children": [
																			{
																				"name": "VQK207",
																				"anno": []
																			},
																			{
																				"name": "VQK61",
																				"anno": []
																			}
																		]
																	}
																]
															},
															{
																"name": "TN173",
																"size": 79.0,
																"children": [
																	{
																		"name": "TN162",
																		"size": 47.0,
																		"children": [
																			{
																				"name": "VQK52",
																				"anno": []
																			},
																			{
																				"name": "VQK83",
																				"anno": []
																			}
																		]
																	},
																	{
																		"name": "TN163",
																		"size": 84.0,
																		"children": [
																			{
																				"name": "VQK117",
																				"anno": []
																			},
																			{
																				"name": "VQK74",
																				"anno": []
																			}
																		]
																	}
																]
															}
														]
													}
												]
											}
										]
									}
								]
							},
							{
								"name": "TN205",
								"size": 85.0,
								"children": [
									{
										"name": "TN199",
										"size": 87.0,
										"children": [
											{ "name": "VQK121", "anno": [] },
											{
												"name": "TN191",
												"size": 88.0,
												"children": [
													{
														"name": "VQK111",
														"anno": []
													},
													{
														"name": "VQK119",
														"anno": []
													}
												]
											}
										]
									},
									{
										"name": "TN200",
										"size": 17.0,
										"children": [
											{
												"name": "TN192",
												"size": 88.0,
												"children": [
													{
														"name": "VQK125",
														"anno": []
													},
													{
														"name": "TN183",
														"size": 50.0,
														"children": [
															{
																"name": "VQK108",
																"anno": []
															},
															{
																"name": "VQK210",
																"anno": []
															}
														]
													}
												]
											},
											{ "name": "VQK109", "anno": [] }
										]
									}
								]
							}
						]
					},
					{ "name": "VQK91", "anno": [] }
				]
			},
			{ "name": "VQK118", "anno": [] },
			{
				"name": "TN211",
				"size": 100.0,
				"children": [
					{
						"name": "TN209",
						"size": 92.0,
						"children": [
							{
								"name": "TN206",
								"size": 83.0,
								"children": [
									{
										"name": "TN201",
										"size": 33.0,
										"children": [
											{ "name": "VQK128", "anno": [] },
											{
												"name": "TN193",
												"size": 21.0,
												"children": [
													{
														"name": "VQK126",
														"anno": []
													},
													{
														"name": "VQK193",
														"anno": []
													}
												]
											}
										]
									},
									{ "name": "VQK98", "anno": [] }
								]
							},
							{
								"name": "TN207",
								"size": 74.0,
								"children": [
									{
										"name": "TN202",
										"size": 74.0,
										"children": [
											{
												"name": "TN194",
												"size": 45.0,
												"children": [
													{
														"name": "VQK202",
														"anno": []
													},
													{
														"name": "TN184",
														"size": 88.0,
														"children": [
															{
																"name": "VQK183",
																"anno": []
															},
															{
																"name": "TN174",
																"size": 85.0,
																"children": [
																	{
																		"name": "VQK93",
																		"anno": []
																	},
																	{
																		"name": "TN164",
																		"size": 99.0,
																		"children": [
																			{
																				"name": "VQK162",
																				"anno": []
																			},
																			{
																				"name": "VQK174",
																				"anno": []
																			}
																		]
																	}
																]
															}
														]
													}
												]
											},
											{
												"name": "TN195",
												"size": 70.0,
												"children": [
													{
														"name": "VQK127",
														"anno": []
													},
													{
														"name": "TN185",
														"size": 64.0,
														"children": [
															{
																"name": "TN175",
																"size": 97.0,
																"children": [
																	{
																		"name": "VQK54",
																		"anno": []
																	},
																	{
																		"name": "TN165",
																		"size": 91.0,
																		"children": [
																			{
																				"name": "TN150",
																				"size": 98.0,
																				"children": [
																					{
																						"name": "TN141",
																						"size": 86.0,
																						"children": [
																							{
																								"name": "VQK55",
																								"anno": []
																							},
																							{
																								"name": "TN134",
																								"size": 83.0,
																								"children": [
																									{
																										"name": "TN126",
																										"size": 96.0,
																										"children": [
																											{
																												"name": "VQK212",
																												"anno": []
																											},
																											{
																												"name": "TN115",
																												"size": 81.0,
																												"children": [
																													{
																														"name": "VQK58",
																														"anno": []
																													},
																													{
																														"name": "TN104",
																														"size": 80.0,
																														"children": [
																															{
																																"name": "VQK39",
																																"anno": []
																															},
																															{
																																"name": "VQK80",
																																"anno": []
																															}
																														]
																													}
																												]
																											}
																										]
																									},
																									{
																										"name": "TN127",
																										"size": 84.0,
																										"children": [
																											{
																												"name": "VQK66",
																												"anno": []
																											},
																											{
																												"name": "TN116",
																												"size": 79.0,
																												"children": [
																													{
																														"name": "VQK59",
																														"anno": []
																													},
																													{
																														"name": "TN105",
																														"size": 86.0,
																														"children": [
																															{
																																"name": "VQK43",
																																"anno": []
																															},
																															{
																																"name": "VQK57",
																																"anno": []
																															}
																														]
																													}
																												]
																											}
																										]
																									}
																								]
																							}
																						]
																					},
																					{
																						"name": "VQK140",
																						"anno": []
																					}
																				]
																			},
																			{
																				"name": "TN151",
																				"size": 59.0,
																				"children": [
																					{
																						"name": "TN142",
																						"size": 88.0,
																						"children": [
																							{
																								"name": "TN135",
																								"size": 91.0,
																								"children": [
																									{
																										"name": "VQK133",
																										"anno": []
																									},
																									{
																										"name": "VQK198",
																										"anno": []
																									}
																								]
																							},
																							{
																								"name": "TN136",
																								"size": 91.0,
																								"children": [
																									{
																										"name": "VQK115",
																										"anno": []
																									},
																									{
																										"name": "TN128",
																										"size": 100.0,
																										"children": [
																											{
																												"name": "VQK123",
																												"anno": []
																											},
																											{
																												"name": "TN117",
																												"size": 100.0,
																												"children": [
																													{
																														"name": "VQK45",
																														"anno": []
																													},
																													{
																														"name": "TN106",
																														"size": 100.0,
																														"children": [
																															{
																																"name": "VQK215",
																																"anno": []
																															},
																															{
																																"name": "TN92",
																																"size": 100.0,
																																"children": [
																																	{
																																		"name": "VQK1",
																																		"anno": [
																																			{
																																				"name": "cultivar",
																																				"value": "PI 597461C"
																																			},
																																			{
																																				"name": "Narrative",
																																				"value": ""
																																			},
																																			{
																																				"name": "Plant Name",
																																				"value": "ZYD3243"
																																			},
																																			{
																																				"name": "Life form",
																																				"value": "Annual"
																																			},
																																			{
																																				"name": "Pedigree",
																																				"value": ""
																																			},
																																			{
																																				"name": "Improvement status",
																																				"value": "Cultivated"
																																			},
																																			{
																																				"name": "Reproductive uniformity",
																																				"value": "Pureline"
																																			},
																																			{
																																				"name": "Locality",
																																				"value": "Shandong, China "
																																			},
																																			{
																																				"name": "Coordinates",
																																				"value": "Latitude: 37 deg. 13 min. 37 sec. North (37.22710440), Longitude: 119 deg. 55 min. 58 sec. East (119.93302510)"
																																			}
																																		]
																																	},
																																	{
																																		"name": "TN83",
																																		"size": 100.0,
																																		"children": [
																																			{
																																				"name": "TN75",
																																				"size": 100.0,
																																				"children": [
																																					{
																																						"name": "VQK104",
																																						"anno": []
																																					},
																																					{
																																						"name": "TN67",
																																						"size": 100.0,
																																						"children": [
																																							{
																																								"name": "TN60",
																																								"size": 100.0,
																																								"children": [
																																									{
																																										"name": "TN56",
																																										"size": 100.0,
																																										"children": [
																																											{
																																												"name": "TN53",
																																												"size": 83.0,
																																												"children": [
																																													{
																																														"name": "TN48",
																																														"size": 83.0,
																																														"children": [
																																															{
																																																"name": "VQK206",
																																																"anno": []
																																															},
																																															{
																																																"name": "VQK213",
																																																"anno": []
																																															}
																																														]
																																													},
																																													{
																																														"name": "TN49",
																																														"size": 17.0,
																																														"children": [
																																															{
																																																"name": "VQK85",
																																																"anno": []
																																															},
																																															{
																																																"name": "VQK216",
																																																"anno": []
																																															}
																																														]
																																													}
																																												]
																																											},
																																											{
																																												"name": "VQK217",
																																												"anno": []
																																											}
																																										]
																																									},
																																									{
																																										"name": "TN57",
																																										"size": 100.0,
																																										"children": [
																																											{
																																												"name": "VQK110",
																																												"anno": []
																																											},
																																											{
																																												"name": "TN54",
																																												"size": 81.0,
																																												"children": [
																																													{
																																														"name": "VQK72",
																																														"anno": []
																																													},
																																													{
																																														"name": "TN50",
																																														"size": 33.0,
																																														"children": [
																																															{
																																																"name": "VQK145",
																																																"anno": []
																																															},
																																															{
																																																"name": "TN44",
																																																"size": 89.0,
																																																"children": [
																																																	{
																																																		"name": "VQK16",
																																																		"anno": [
																																																			{
																																																				"name": "cultivar",
																																																				"value": "PI 507662"
																																																			},
																																																			{
																																																				"name": "Narrative",
																																																				"value": ""
																																																			},
																																																			{
																																																				"name": "Plant Name",
																																																				"value": "NIAR 090019"
																																																			},
																																																			{
																																																				"name": "Life form",
																																																				"value": "Annual"
																																																			},
																																																			{
																																																				"name": "Pedigree",
																																																				"value": ""
																																																			},
																																																			{
																																																				"name": "Improvement status",
																																																				"value": "Wild"
																																																			},
																																																			{
																																																				"name": "Reproductive uniformity",
																																																				"value": "Pureline"
																																																			},
																																																			{
																																																				"name": "Locality",
																																																				"value": "Kagoshima, Japan "
																																																			},
																																																			{
																																																				"name": "Coordinates",
																																																				"value": "Latitude: 31 deg. 19 min. 59 sec. North (31.33333300), Longitude: 130 deg. 56 min. 0 sec. East (130.93333440)"
																																																			}
																																																		]
																																																	},
																																																	{
																																																		"name": "VQK157",
																																																		"anno": []
																																																	}
																																																]
																																															}
																																														]
																																													}
																																												]
																																											}
																																										]
																																									}
																																								]
																																							},
																																							{
																																								"name": "TN61",
																																								"size": 100.0,
																																								"children": [
																																									{
																																										"name": "VQK116",
																																										"anno": []
																																									},
																																									{
																																										"name": "TN58",
																																										"size": 100.0,
																																										"children": [
																																											{
																																												"name": "TN55",
																																												"size": 95.0,
																																												"children": [
																																													{
																																														"name": "TN51",
																																														"size": 100.0,
																																														"children": [
																																															{
																																																"name": "TN45",
																																																"size": 100.0,
																																																"children": [
																																																	{
																																																		"name": "VQK87",
																																																		"anno": []
																																																	},
																																																	{
																																																		"name": "TN42",
																																																		"size": 99.0,
																																																		"children": [
																																																			{
																																																				"name": "TN39",
																																																				"size": 97.0,
																																																				"children": [
																																																					{
																																																						"name": "TN35",
																																																						"size": 30.0,
																																																						"children": [
																																																							{
																																																								"name": "TN28",
																																																								"size": 74.0,
																																																								"children": [
																																																									{
																																																										"name": "VQK27",
																																																										"anno": [
																																																											{
																																																												"name": "cultivar",
																																																												"value": "PI 464929A"
																																																											},
																																																											{
																																																												"name": "Narrative",
																																																												"value": ""
																																																											},
																																																											{
																																																												"name": "Plant Name",
																																																												"value": "LS-009"
																																																											},
																																																											{
																																																												"name": "Life form",
																																																												"value": "Annual"
																																																											},
																																																											{
																																																												"name": "Pedigree",
																																																												"value": ""
																																																											},
																																																											{
																																																												"name": "Improvement status",
																																																												"value": "Wild"
																																																											},
																																																											{
																																																												"name": "Reproductive uniformity",
																																																												"value": "Pureline"
																																																											},
																																																											{
																																																												"name": "Locality",
																																																												"value": "Liaoning, China "
																																																											},
																																																											{
																																																												"name": "Coordinates",
																																																												"value": "Latitude: 40 deg. 48 min. 17 sec. North (40.80473140), Longitude: 122 deg. 46 min. 51 sec. East (122.78094110) "
																																																											}
																																																										]
																																																									},
																																																									{
																																																										"name": "TN20",
																																																										"size": 55.00000000000001,
																																																										"children": [
																																																											{
																																																												"name": "VQK179",
																																																												"anno": []
																																																											},
																																																											{
																																																												"name": "VQK168",
																																																												"anno": []
																																																											}
																																																										]
																																																									}
																																																								]
																																																							},
																																																							{
																																																								"name": "VQK171",
																																																								"anno": []
																																																							}
																																																						]
																																																					},
																																																					{
																																																						"name": "TN36",
																																																						"size": 33.0,
																																																						"children": [
																																																							{
																																																								"name": "TN29",
																																																								"size": 92.0,
																																																								"children": [
																																																									{
																																																										"name": "TN21",
																																																										"size": 20.0,
																																																										"children": [
																																																											{
																																																												"name": "VQK7",
																																																												"anno": [
																																																													{
																																																														"name": "cultivar",
																																																														"value": "PI 578341"
																																																													},
																																																													{
																																																														"name": "Narrative",
																																																														"value": ""
																																																													},
																																																													{
																																																														"name": "Plant Name",
																																																														"value": "L.521"
																																																													},
																																																													{
																																																														"name": "Life form",
																																																														"value": "Annual"
																																																													},
																																																													{
																																																														"name": "Pedigree",
																																																														"value": ""
																																																													},
																																																													{
																																																														"name": "Improvement status",
																																																														"value": "Wild"
																																																													},
																																																													{
																																																														"name": "Reproductive uniformity",
																																																														"value": "Pureline"
																																																													},
																																																													{
																																																														"name": "Locality",
																																																														"value": "Khabarovsk, Russian Federation "
																																																													},
																																																													{
																																																														"name": "Coordinates",
																																																														"value": "Latitude: 48 deg. 29 min. 48 sec. North (48.49690430), Longitude: 135 deg. 7 min. 56 sec. East (135.13231670)"
																																																													}
																																																												]
																																																											},
																																																											{
																																																												"name": "TN14",
																																																												"size": 76.0,
																																																												"children": [
																																																													{
																																																														"name": "TN10",
																																																														"size": 97.0,
																																																														"children": [
																																																															{
																																																																"name": "VQK8",
																																																																"anno": [
																																																																	{
																																																																		"name": "cultivar",
																																																																		"value": "PI 562565"
																																																																	},
																																																																	{
																																																																		"name": "Narrative",
																																																																		"value": "Pureline"
																																																																	},
																																																																	{
																																																																		"name": "Plant Name",
																																																																		"value": "KF13"
																																																																	},
																																																																	{
																																																																		"name": "Life form",
																																																																		"value": "Annual"
																																																																	},
																																																																	{
																																																																		"name": "Pedigree",
																																																																		"value": ""
																																																																	},
																																																																	{
																																																																		"name": "Improvement status",
																																																																		"value": "Breeding"
																																																																	},
																																																																	{
																																																																		"name": "Reproductive uniformity",
																																																																		"value": "Pureline"
																																																																	},
																																																																	{
																																																																		"name": "Locality",
																																																																		"value": "Cholla Puk, Korea "
																																																																	},
																																																																	{
																																																																		"name": "Coordinates",
																																																																		"value": "latitude: 35 deg. 32 min. N. longitude: 127 deg. 20 min. E."
																																																																	}
																																																																]
																																																															},
																																																															{
																																																																"name": "VQK5",
																																																																"anno": [
																																																																	{
																																																																		"name": "cultivar",
																																																																		"value": "PI 593983"
																																																																	},
																																																																	{
																																																																		"name": "Narrative",
																																																																		"value": "Wild line received with G. max donations"
																																																																	},
																																																																	{
																																																																		"name": "Plant Name",
																																																																		"value": "Hidaka-6"
																																																																	},
																																																																	{
																																																																		"name": "Life form",
																																																																		"value": "Annual"
																																																																	},
																																																																	{
																																																																		"name": "Pedigree",
																																																																		"value": ""
																																																																	},
																																																																	{
																																																																		"name": "Improvement status",
																																																																		"value": "Cultivated"
																																																																	},
																																																																	{
																																																																		"name": "Reproductive uniformity",
																																																																		"value": "Highly inbred"
																																																																	},
																																																																	{
																																																																		"name": "Locality",
																																																																		"value": "Hokkaido, Japan "
																																																																	},
																																																																	{
																																																																		"name": "Coordinates",
																																																																		"value": "Latitude: 42 deg. 52 min. 21 sec. North (42.87277600), Longitude: 142 deg. 26 min. 26 sec. East (142.44056700)"
																																																																	}
																																																																]
																																																															}
																																																														]
																																																													},
																																																													{
																																																														"name": "TN11",
																																																														"size": 85.0,
																																																														"children": [
																																																															{
																																																																"name": "TN6",
																																																																"size": 74.0,
																																																																"children": [
																																																																	{
																																																																		"name": "TN3",
																																																																		"size": 95.0,
																																																																		"children": [
																																																																			{
																																																																				"name": "VQK113",
																																																																				"anno": []
																																																																			},
																																																																			{
																																																																				"name": "VQK9",
																																																																				"anno": [
																																																																					{
																																																																						"name": "cultivar",
																																																																						"value": "PI 562559"
																																																																					},
																																																																					{
																																																																						"name": "Narrative",
																																																																						"value": ""
																																																																					},
																																																																					{
																																																																						"name": "Plant Name",
																																																																						"value": "KE16"
																																																																					},
																																																																					{
																																																																						"name": "Life form",
																																																																						"value": "Annual"
																																																																					},
																																																																					{
																																																																						"name": "Pedigree",
																																																																						"value": ""
																																																																					},
																																																																					{
																																																																						"name": "Improvement status",
																																																																						"value": "Breeding"
																																																																					},
																																																																					{
																																																																						"name": "Reproductive uniformity",
																																																																						"value": "Pureline"
																																																																					},
																																																																					{
																																																																						"name": "Locality",
																																																																						"value": "Cholla Puk, Korea "
																																																																					},
																																																																					{
																																																																						"name": "Coordinates",
																																																																						"value": "latitude: 35 deg. 49 min. N. longitude: 127 deg. 07 min. E."
																																																																					}
																																																																				]
																																																																			}
																																																																		]
																																																																	},
																																																																	{
																																																																		"name": "TN4",
																																																																		"size": 78.0,
																																																																		"children": [
																																																																			{
																																																																				"name": "VQK103",
																																																																				"anno": []
																																																																			},
																																																																			{
																																																																				"name": "VQK101",
																																																																				"anno": []
																																																																			}
																																																																		]
																																																																	}
																																																																]
																																																															},
																																																															{
																																																																"name": "TN7",
																																																																"size": 88.0,
																																																																"children": [
																																																																	{
																																																																		"name": "TN5",
																																																																		"size": 91.0,
																																																																		"children": [
																																																																			{
																																																																				"name": "VQK10",
																																																																				"anno": [
																																																																					{
																																																																						"name": "cultivar",
																																																																						"value": "PI 549046"
																																																																					},
																																																																					{
																																																																						"name": "Narrative",
																																																																						"value": ""
																																																																					},
																																																																					{
																																																																						"name": "Plant Name",
																																																																						"value": "ZYD3728"
																																																																					},
																																																																					{
																																																																						"name": "Life form",
																																																																						"value": "Annual"
																																																																					},
																																																																					{
																																																																						"name": "Pedigree",
																																																																						"value": ""
																																																																					},
																																																																					{
																																																																						"name": "Improvement status",
																																																																						"value": "Cultivated"
																																																																					},
																																																																					{
																																																																						"name": "Reproductive uniformity",
																																																																						"value": "Pureline"
																																																																					},
																																																																					{
																																																																						"name": "Locality",
																																																																						"value": "Shaanxi, China "
																																																																					},
																																																																					{
																																																																						"name": "Coordinates",
																																																																						"value": "Latitude: 37 deg. 31 min. 54 sec. North (37.53182230), Longitude: 107 deg. 23 min. 50 sec. East (107.39727060)"
																																																																					}
																																																																				]
																																																																			},
																																																																			{
																																																																				"name": "TN2",
																																																																				"size": 92.0,
																																																																				"children": [
																																																																					{
																																																																						"name": "TN1",
																																																																						"size": 96.0,
																																																																						"children": [
																																																																							{
																																																																								"name": "VQK11",
																																																																								"anno": [
																																																																									{
																																																																										"name": "cultivar",
																																																																										"value": "PI 547831"
																																																																									},
																																																																									{
																																																																										"name": "Narrative",
																																																																										"value": "Wild isoline with Gene: Rsv1"
																																																																									},
																																																																									{
																																																																										"name": "Plant Name",
																																																																										"value": "L83-0215"
																																																																									},
																																																																									{
																																																																										"name": "Life form",
																																																																										"value": "Annual"
																																																																									},
																																																																									{
																																																																										"name": "Pedigree",
																																																																										"value": "PI 65549(6) x PI 96983"
																																																																									},
																																																																									{
																																																																										"name": "Improvement status",
																																																																										"value": "Genetic"
																																																																									},
																																																																									{
																																																																										"name": "Reproductive uniformity",
																																																																										"value": "Pureline"
																																																																									},
																																																																									{
																																																																										"name": "Locality",
																																																																										"value": "Illinois, United States "
																																																																									},
																																																																									{
																																																																										"name": "Coordinates",
																																																																										"value": ""
																																																																									}
																																																																								]
																																																																							},
																																																																							{
																																																																								"name": "VQK18",
																																																																								"anno": [
																																																																									{
																																																																										"name": "cultivar",
																																																																										"value": "PI 483465"
																																																																									},
																																																																									{
																																																																										"name": "Narrative",
																																																																										"value": ""
																																																																									},
																																																																									{
																																																																										"name": "Plant Name",
																																																																										"value": ""
																																																																									},
																																																																									{
																																																																										"name": "Life form",
																																																																										"value": "Annual"
																																																																									},
																																																																									{
																																																																										"name": "Pedigree",
																																																																										"value": ""
																																																																									},
																																																																									{
																																																																										"name": "Improvement status",
																																																																										"value": "Wild"
																																																																									},
																																																																									{
																																																																										"name": "Reproductive uniformity",
																																																																										"value": "Pureline"
																																																																									},
																																																																									{
																																																																										"name": "Locality",
																																																																										"value": "Shaanxi, China "
																																																																									},
																																																																									{
																																																																										"name": "Coordinates",
																																																																										"value": "Latitude: 34 deg. 52 min. 50 sec. North (34.88067040), Longitude: 110 deg. 0 min. 36 sec. East (110.01004760)"
																																																																									}
																																																																								]
																																																																							}
																																																																						]
																																																																					},
																																																																					{
																																																																						"name": "VQK114",
																																																																						"anno": []
																																																																					}
																																																																				]
																																																																			}
																																																																		]
																																																																	},
																																																																	{
																																																																		"name": "VQK13",
																																																																		"anno": [
																																																																			{
																																																																				"name": "cultivar",
																																																																				"value": "PI 522226"
																																																																			},
																																																																			{
																																																																				"name": "Narrative",
																																																																				"value": ""
																																																																			},
																																																																			{
																																																																				"name": "Plant Name",
																																																																				"value": "VIR 8511"
																																																																			},
																																																																			{
																																																																				"name": "Life form",
																																																																				"value": "Annual"
																																																																			},
																																																																			{
																																																																				"name": "Pedigree",
																																																																				"value": ""
																																																																			},
																																																																			{
																																																																				"name": "Improvement status",
																																																																				"value": "Wild"
																																																																			},
																																																																			{
																																																																				"name": "Reproductive uniformity",
																																																																				"value": "Pureline"
																																																																			},
																																																																			{
																																																																				"name": "Locality",
																																																																				"value": "Primorye, Russian Federation "
																																																																			},
																																																																			{
																																																																				"name": "Coordinates",
																																																																				"value": "Latitude: 44 deg. 59 min. 59 sec. North (44.99999620), Longitude: 134 deg. 59 min. 59 sec. East (134.99999240)"
																																																																			}
																																																																		]
																																																																	}
																																																																]
																																																															}
																																																														]
																																																													}
																																																												]
																																																											}
																																																										]
																																																									},
																																																									{
																																																										"name": "TN22",
																																																										"size": 93.0,
																																																										"children": [
																																																											{
																																																												"name": "VQK53",
																																																												"anno": []
																																																											},
																																																											{
																																																												"name": "VQK40",
																																																												"anno": []
																																																											}
																																																										]
																																																									}
																																																								]
																																																							},
																																																							{
																																																								"name": "TN30",
																																																								"size": 72.0,
																																																								"children": [
																																																									{
																																																										"name": "TN23",
																																																										"size": 82.0,
																																																										"children": [
																																																											{
																																																												"name": "TN15",
																																																												"size": 89.0,
																																																												"children": [
																																																													{
																																																														"name": "VQK172",
																																																														"anno": []
																																																													},
																																																													{
																																																														"name": "VQK167",
																																																														"anno": []
																																																													}
																																																												]
																																																											},
																																																											{
																																																												"name": "TN16",
																																																												"size": 40.0,
																																																												"children": [
																																																													{
																																																														"name": "VQK29",
																																																														"anno": [
																																																															{
																																																																"name": "cultivar",
																																																																"value": "PI 458538"
																																																															},
																																																															{
																																																																"name": "Narrative",
																																																																"value": ""
																																																															},
																																																															{
																																																																"name": "Plant Name",
																																																																"value": ""
																																																															},
																																																															{
																																																																"name": "Life form",
																																																																"value": "Annual"
																																																															},
																																																															{
																																																																"name": "Pedigree",
																																																																"value": ""
																																																															},
																																																															{
																																																																"name": "Improvement status",
																																																																"value": "Wild"
																																																															},
																																																															{
																																																																"name": "Reproductive uniformity",
																																																																"value": "Pureline"
																																																															},
																																																															{
																																																																"name": "Locality",
																																																																"value": "Heilongjiang, China "
																																																															},
																																																															{
																																																																"name": "Coordinates",
																																																																"value": ""
																																																															}
																																																														]
																																																													},
																																																													{
																																																														"name": "TN12",
																																																														"size": 90.0,
																																																														"children": [
																																																															{
																																																																"name": "TN8",
																																																																"size": 78.0,
																																																																"children": [
																																																																	{
																																																																		"name": "VQK32",
																																																																		"anno": [
																																																																			{
																																																																				"name": "cultivar",
																																																																				"value": "PI 447004"
																																																																			},
																																																																			{
																																																																				"name": "Narrative",
																																																																				"value": "Matures in 150 days"
																																																																			},
																																																																			{
																																																																				"name": "Plant Name",
																																																																				"value": ""
																																																																			},
																																																																			{
																																																																				"name": "Life form",
																																																																				"value": "Annual"
																																																																			},
																																																																			{
																																																																				"name": "Pedigree",
																																																																				"value": ""
																																																																			},
																																																																			{
																																																																				"name": "Improvement status",
																																																																				"value": "Wild"
																																																																			},
																																																																			{
																																																																				"name": "Reproductive uniformity",
																																																																				"value": "Pureline"
																																																																			},
																																																																			{
																																																																				"name": "Locality",
																																																																				"value": "Jilin, China "
																																																																			},
																																																																			{
																																																																				"name": "Coordinates",
																																																																				"value": "Latitude: 42 deg. 29 min. 51 sec. North (42.49775490), Longitude: 126 deg. 49 min. 47 sec. East (126.82991420)"
																																																																			}
																																																																		]
																																																																	},
																																																																	{
																																																																		"name": "VQK142",
																																																																		"anno": []
																																																																	}
																																																																]
																																																															},
																																																															{
																																																																"name": "VQK26",
																																																																"anno": [
																																																																	{
																																																																		"name": "cultivar",
																																																																		"value": "PI 464929B"
																																																																	},
																																																																	{
																																																																		"name": "Narrative",
																																																																		"value": ""
																																																																	},
																																																																	{
																																																																		"name": "Plant Name",
																																																																		"value": "(LS-009)"
																																																																	},
																																																																	{
																																																																		"name": "Life form",
																																																																		"value": "Annual"
																																																																	},
																																																																	{
																																																																		"name": "Pedigree",
																																																																		"value": ""
																																																																	},
																																																																	{
																																																																		"name": "Improvement status",
																																																																		"value": "Wild"
																																																																	},
																																																																	{
																																																																		"name": "Reproductive uniformity",
																																																																		"value": "Pureline"
																																																																	},
																																																																	{
																																																																		"name": "Locality",
																																																																		"value": "Liaoning, China "
																																																																	},
																																																																	{
																																																																		"name": "Coordinates",
																																																																		"value": "Latitude: 40 deg. 48 min. 17 sec. North (40.80473140), Longitude: 122 deg. 46 min. 51 sec. East (122.78094110) "
																																																																	}
																																																																]
																																																															}
																																																														]
																																																													}
																																																												]
																																																											}
																																																										]
																																																									},
																																																									{
																																																										"name": "VQK200",
																																																										"anno": []
																																																									}
																																																								]
																																																							}
																																																						]
																																																					}
																																																				]
																																																			},
																																																			{
																																																				"name": "VQK164",
																																																				"anno": []
																																																			}
																																																		]
																																																	}
																																																]
																																															},
																																															{
																																																"name": "TN46",
																																																"size": 100.0,
																																																"children": [
																																																	{
																																																		"name": "VQK35",
																																																		"anno": []
																																																	},
																																																	{
																																																		"name": "TN43",
																																																		"size": 100.0,
																																																		"children": [
																																																			{
																																																				"name": "TN40",
																																																				"size": 100.0,
																																																				"children": [
																																																					{
																																																						"name": "TN37",
																																																						"size": 87.0,
																																																						"children": [
																																																							{
																																																								"name": "TN31",
																																																								"size": 92.0,
																																																								"children": [
																																																									{
																																																										"name": "VQK31",
																																																										"anno": [
																																																											{
																																																												"name": "cultivar",
																																																												"value": "PI 458535"
																																																											},
																																																											{
																																																												"name": "Narrative",
																																																												"value": ""
																																																											},
																																																											{
																																																												"name": "Plant Name",
																																																												"value": ""
																																																											},
																																																											{
																																																												"name": "Life form",
																																																												"value": "Annual"
																																																											},
																																																											{
																																																												"name": "Pedigree",
																																																												"value": ""
																																																											},
																																																											{
																																																												"name": "Improvement status",
																																																												"value": "Wild"
																																																											},
																																																											{
																																																												"name": "Reproductive uniformity",
																																																												"value": "Pureline"
																																																											},
																																																											{
																																																												"name": "Locality",
																																																												"value": "Heilongjiang, China "
																																																											},
																																																											{
																																																												"name": "Coordinates",
																																																												"value": "Latitude: 48 deg. 16 min. 0 sec. North (48.26666830), Longitude: 126 deg. 36 min. 0 sec. East (126.60000230)"
																																																											}
																																																										]
																																																									},
																																																									{
																																																										"name": "TN24",
																																																										"size": 16.0,
																																																										"children": [
																																																											{
																																																												"name": "VQK173",
																																																												"anno": []
																																																											},
																																																											{
																																																												"name": "VQK182",
																																																												"anno": []
																																																											}
																																																										]
																																																									}
																																																								]
																																																							},
																																																							{
																																																								"name": "TN32",
																																																								"size": 86.0,
																																																								"children": [
																																																									{
																																																										"name": "VQK185",
																																																										"anno": []
																																																									},
																																																									{
																																																										"name": "VQK33",
																																																										"anno": []
																																																									}
																																																								]
																																																							}
																																																						]
																																																					},
																																																					{
																																																						"name": "TN38",
																																																						"size": 17.0,
																																																						"children": [
																																																							{
																																																								"name": "TN33",
																																																								"size": 100.0,
																																																								"children": [
																																																									{
																																																										"name": "TN25",
																																																										"size": 81.0,
																																																										"children": [
																																																											{
																																																												"name": "VQK124",
																																																												"anno": []
																																																											},
																																																											{
																																																												"name": "VQK2",
																																																												"anno": [
																																																													{
																																																														"name": "cultivar",
																																																														"value": "PI 597461A"
																																																													},
																																																													{
																																																														"name": "Narrative",
																																																														"value": ""
																																																													},
																																																													{
																																																														"name": "Plant Name",
																																																														"value": "ZYD3243"
																																																													},
																																																													{
																																																														"name": "Life form",
																																																														"value": "Annual"
																																																													},
																																																													{
																																																														"name": "Pedigree",
																																																														"value": ""
																																																													},
																																																													{
																																																														"name": "Improvement status",
																																																														"value": "Cultivated"
																																																													},
																																																													{
																																																														"name": "Reproductive uniformity",
																																																														"value": "Pureline"
																																																													},
																																																													{
																																																														"name": "Locality",
																																																														"value": "Shandong, China "
																																																													},
																																																													{
																																																														"name": "Coordinates",
																																																														"value": "Latitude: 37 deg. 13 min. 37 sec. North (37.22710440), Longitude: 119 deg. 55 min. 58 sec. East (119.93302510)"
																																																													}
																																																												]
																																																											}
																																																										]
																																																									},
																																																									{
																																																										"name": "TN26",
																																																										"size": 93.0,
																																																										"children": [
																																																											{
																																																												"name": "TN17",
																																																												"size": 81.0,
																																																												"children": [
																																																													{
																																																														"name": "VQK102",
																																																														"anno": []
																																																													},
																																																													{
																																																														"name": "VQK106",
																																																														"anno": []
																																																													}
																																																												]
																																																											},
																																																											{
																																																												"name": "TN18",
																																																												"size": 81.0,
																																																												"children": [
																																																													{
																																																														"name": "VQK218",
																																																														"anno": []
																																																													},
																																																													{
																																																														"name": "VQK42",
																																																														"anno": []
																																																													}
																																																												]
																																																											}
																																																										]
																																																									}
																																																								]
																																																							},
																																																							{
																																																								"name": "TN34",
																																																								"size": 67.0,
																																																								"children": [
																																																									{
																																																										"name": "VQK41",
																																																										"anno": []
																																																									},
																																																									{
																																																										"name": "TN27",
																																																										"size": 28.000000000000004,
																																																										"children": [
																																																											{
																																																												"name": "TN19",
																																																												"size": 22.0,
																																																												"children": [
																																																													{
																																																														"name": "TN13",
																																																														"size": 71.0,
																																																														"children": [
																																																															{
																																																																"name": "VQK166",
																																																																"anno": []
																																																															},
																																																															{
																																																																"name": "TN9",
																																																																"size": 94.0,
																																																																"children": [
																																																																	{
																																																																		"name": "VQK160",
																																																																		"anno": []
																																																																	},
																																																																	{
																																																																		"name": "VQK156",
																																																																		"anno": []
																																																																	}
																																																																]
																																																															}
																																																														]
																																																													},
																																																													{
																																																														"name": "VQK46",
																																																														"anno": []
																																																													}
																																																												]
																																																											},
																																																											{
																																																												"name": "VQK165",
																																																												"anno": []
																																																											}
																																																										]
																																																									}
																																																								]
																																																							}
																																																						]
																																																					}
																																																				]
																																																			},
																																																			{
																																																				"name": "TN41",
																																																				"size": 98.0,
																																																				"children": [
																																																					{
																																																						"name": "VQK112",
																																																						"anno": []
																																																					},
																																																					{
																																																						"name": "VQK204",
																																																						"anno": []
																																																					}
																																																				]
																																																			}
																																																		]
																																																	}
																																																]
																																															}
																																														]
																																													},
																																													{
																																														"name": "TN52",
																																														"size": 91.0,
																																														"children": [
																																															{
																																																"name": "VQK149",
																																																"anno": []
																																															},
																																															{
																																																"name": "TN47",
																																																"size": 74.0,
																																																"children": [
																																																	{
																																																		"name": "VQK131",
																																																		"anno": []
																																																	},
																																																	{
																																																		"name": "VQK60",
																																																		"anno": []
																																																	}
																																																]
																																															}
																																														]
																																													}
																																												]
																																											},
																																											{
																																												"name": "VQK155",
																																												"anno": []
																																											}
																																										]
																																									}
																																								]
																																							}
																																						]
																																					}
																																				]
																																			},
																																			{
																																				"name": "VQK37",
																																				"anno": []
																																			}
																																		]
																																	}
																																]
																															}
																														]
																													}
																												]
																											}
																										]
																									}
																								]
																							}
																						]
																					},
																					{
																						"name": "TN143",
																						"size": 93.0,
																						"children": [
																							{
																								"name": "TN137",
																								"size": 100.0,
																								"children": [
																									{
																										"name": "VQK67",
																										"anno": []
																									},
																									{
																										"name": "TN129",
																										"size": 82.0,
																										"children": [
																											{
																												"name": "TN118",
																												"size": 78.0,
																												"children": [
																													{
																														"name": "TN107",
																														"size": 78.0,
																														"children": [
																															{
																																"name": "TN93",
																																"size": 90.0,
																																"children": [
																																	{
																																		"name": "TN84",
																																		"size": 91.0,
																																		"children": [
																																			{
																																				"name": "TN76",
																																				"size": 51.0,
																																				"children": [
																																					{
																																						"name": "VQK176",
																																						"anno": []
																																					},
																																					{
																																						"name": "TN68",
																																						"size": 90.0,
																																						"children": [
																																							{
																																								"name": "VQK190",
																																								"anno": []
																																							},
																																							{
																																								"name": "TN62",
																																								"size": 96.0,
																																								"children": [
																																									{
																																										"name": "VQK150",
																																										"anno": []
																																									},
																																									{
																																										"name": "VQK70",
																																										"anno": []
																																									}
																																								]
																																							}
																																						]
																																					}
																																				]
																																			},
																																			{
																																				"name": "VQK34",
																																				"anno": []
																																			}
																																		]
																																	},
																																	{
																																		"name": "TN85",
																																		"size": 75.0,
																																		"children": [
																																			{
																																				"name": "TN77",
																																				"size": 0.0,
																																				"children": [
																																					{
																																						"name": "TN69",
																																						"size": 0.0,
																																						"children": [
																																							{
																																								"name": "VQK19",
																																								"anno": [
																																									{
																																										"name": "cultivar",
																																										"value": "PI 483464A"
																																									},
																																									{
																																										"name": "Narrative",
																																										"value": ""
																																									},
																																									{
																																										"name": "Plant Name",
																																										"value": ""
																																									},
																																									{
																																										"name": "Life form",
																																										"value": "Annual"
																																									},
																																									{
																																										"name": "Pedigree",
																																										"value": ""
																																									},
																																									{
																																										"name": "Improvement status",
																																										"value": "Wild"
																																									},
																																									{
																																										"name": "Reproductive uniformity",
																																										"value": "Pureline"
																																									},
																																									{
																																										"name": "Locality",
																																										"value": "Ningxia, China "
																																									},
																																									{
																																										"name": "Coordinates",
																																										"value": "Latitude: 38 deg. 47 min. 48 sec. North (38.79666900), Longitude: 106 deg. 40 min. 19 sec. East (106.67222210)"
																																									}
																																								]
																																							},
																																							{
																																								"name": "TN63",
																																								"size": 82.0,
																																								"children": [
																																									{
																																										"name": "VQK148",
																																										"anno": []
																																									},
																																									{
																																										"name": "VQK94",
																																										"anno": []
																																									}
																																								]
																																							}
																																						]
																																					},
																																					{
																																						"name": "TN70",
																																						"size": 0.0,
																																						"children": [
																																							{
																																								"name": "TN64",
																																								"size": 73.0,
																																								"children": [
																																									{
																																										"name": "VQK92",
																																										"anno": []
																																									},
																																									{
																																										"name": "VQK189",
																																										"anno": []
																																									}
																																								]
																																							},
																																							{
																																								"name": "VQK48",
																																								"anno": []
																																							}
																																						]
																																					}
																																				]
																																			},
																																			{
																																				"name": "TN78",
																																				"size": 97.0,
																																				"children": [
																																					{
																																						"name": "VQK3",
																																						"anno": [
																																							{
																																								"name": "cultivar",
																																								"value": "PI 597459D"
																																							},
																																							{
																																								"name": "Narrative",
																																								"value": ""
																																							},
																																							{
																																								"name": "Plant Name",
																																								"value": "ZYD3234"
																																							},
																																							{
																																								"name": "Life form",
																																								"value": "Annual"
																																							},
																																							{
																																								"name": "Pedigree",
																																								"value": ""
																																							},
																																							{
																																								"name": "Improvement status",
																																								"value": "Cultivated"
																																							},
																																							{
																																								"name": "Reproductive uniformity",
																																								"value": "Pureline"
																																							},
																																							{
																																								"name": "Locality",
																																								"value": "Shandong, China "
																																							},
																																							{
																																								"name": "Coordinates",
																																								"value": "Latitude: 37 deg. 13 min. 37 sec. North (37.22710440), Longitude: 119 deg. 55 min. 58 sec. East (119.93302510)"
																																							}
																																						]
																																					},
																																					{
																																						"name": "TN71",
																																						"size": 96.0,
																																						"children": [
																																							{
																																								"name": "VQK175",
																																								"anno": []
																																							},
																																							{
																																								"name": "TN65",
																																								"size": 90.0,
																																								"children": [
																																									{
																																										"name": "VQK132",
																																										"anno": []
																																									},
																																									{
																																										"name": "TN59",
																																										"size": 78.0,
																																										"children": [
																																											{
																																												"name": "VQK152",
																																												"anno": []
																																											},
																																											{
																																												"name": "VQK122",
																																												"anno": []
																																											}
																																										]
																																									}
																																								]
																																							}
																																						]
																																					}
																																				]
																																			}
																																		]
																																	}
																																]
																															},
																															{
																																"name": "TN94",
																																"size": 84.0,
																																"children": [
																																	{
																																		"name": "TN86",
																																		"size": 89.0,
																																		"children": [
																																			{
																																				"name": "VQK205",
																																				"anno": []
																																			},
																																			{
																																				"name": "TN79",
																																				"size": 90.0,
																																				"children": [
																																					{
																																						"name": "VQK88",
																																						"anno": []
																																					},
																																					{
																																						"name": "TN72",
																																						"size": 88.0,
																																						"children": [
																																							{
																																								"name": "VQK38",
																																								"anno": []
																																							},
																																							{
																																								"name": "TN66",
																																								"size": 32.0,
																																								"children": [
																																									{
																																										"name": "VQK65",
																																										"anno": []
																																									},
																																									{
																																										"name": "VQK81",
																																										"anno": []
																																									}
																																								]
																																							}
																																						]
																																					}
																																				]
																																			}
																																		]
																																	},
																																	{
																																		"name": "VQK99",
																																		"anno": []
																																	}
																																]
																															}
																														]
																													},
																													{
																														"name": "TN108",
																														"size": 76.0,
																														"children": [
																															{
																																"name": "VQK28",
																																"anno": [
																																	{
																																		"name": "cultivar",
																																		"value": "PI 464927A"
																																	},
																																	{
																																		"name": "Narrative",
																																		"value": ""
																																	},
																																	{
																																		"name": "Plant Name",
																																		"value": "LS-005"
																																	},
																																	{
																																		"name": "Life form",
																																		"value": "Annual"
																																	},
																																	{
																																		"name": "Pedigree",
																																		"value": ""
																																	},
																																	{
																																		"name": "Improvement status",
																																		"value": "Wild"
																																	},
																																	{
																																		"name": "Reproductive uniformity",
																																		"value": "Pureline"
																																	},
																																	{
																																		"name": "Locality",
																																		"value": "Liaoning, China "
																																	},
																																	{
																																		"name": "Coordinates",
																																		"value": "Latitude: 42 deg. 27 min. 51 sec. North (42.46423530), Longitude: 124 deg. 2 min. 24 sec. East (124.04025660)"
																																	}
																																]
																															},
																															{
																																"name": "VQK96",
																																"anno": []
																															}
																														]
																													}
																												]
																											},
																											{
																												"name": "TN119",
																												"size": 45.0,
																												"children": [
																													{
																														"name": "VQK100",
																														"anno": []
																													},
																													{
																														"name": "VQK64",
																														"anno": []
																													}
																												]
																											}
																										]
																									}
																								]
																							},
																							{
																								"name": "TN138",
																								"size": 90.0,
																								"children": [
																									{
																										"name": "TN130",
																										"size": 99.0,
																										"children": [
																											{
																												"name": "TN120",
																												"size": 41.0,
																												"children": [
																													{
																														"name": "TN109",
																														"size": 63.0,
																														"children": [
																															{
																																"name": "TN95",
																																"size": 83.0,
																																"children": [
																																	{
																																		"name": "TN87",
																																		"size": 78.0,
																																		"children": [
																																			{
																																				"name": "VQK62",
																																				"anno": []
																																			},
																																			{
																																				"name": "VQK134",
																																				"anno": []
																																			}
																																		]
																																	},
																																	{
																																		"name": "TN88",
																																		"size": 77.0,
																																		"children": [
																																			{
																																				"name": "TN80",
																																				"size": 93.0,
																																				"children": [
																																					{
																																						"name": "VQK12",
																																						"anno": [
																																							{
																																								"name": "cultivar",
																																								"value": "PI 522228"
																																							},
																																							{
																																								"name": "Narrative",
																																								"value": ""
																																							},
																																							{
																																								"name": "Plant Name",
																																								"value": "VIR 8514"
																																							},
																																							{
																																								"name": "Life form",
																																								"value": "Annual"
																																							},
																																							{
																																								"name": "Pedigree",
																																								"value": ""
																																							},
																																							{
																																								"name": "Improvement status",
																																								"value": "Wild"
																																							},
																																							{
																																								"name": "Reproductive uniformity",
																																								"value": "Pureline"
																																							},
																																							{
																																								"name": "Locality",
																																								"value": "Primorye, Russian Federation "
																																							},
																																							{
																																								"name": "Coordinates",
																																								"value": "Latitude: 44 deg. 59 min. 59 sec. North (44.99999620), Longitude: 134 deg. 59 min. 59 sec. East (134.99999240)"
																																							}
																																						]
																																					},
																																					{
																																						"name": "VQK14",
																																						"anno": [
																																							{
																																								"name": "cultivar",
																																								"value": "PI 522216"
																																							},
																																							{
																																								"name": "Narrative",
																																								"value": ""
																																							},
																																							{
																																								"name": "Plant Name",
																																								"value": "VIR 8500"
																																							},
																																							{
																																								"name": "Life form",
																																								"value": "Annual"
																																							},
																																							{
																																								"name": "Pedigree",
																																								"value": ""
																																							},
																																							{
																																								"name": "Improvement status",
																																								"value": "Wild"
																																							},
																																							{
																																								"name": "Reproductive uniformity",
																																								"value": "Pureline"
																																							},
																																							{
																																								"name": "Locality",
																																								"value": "Primorye, Russian Federation "
																																							},
																																							{
																																								"name": "Coordinates",
																																								"value": "Latitude: 44 deg. 59 min. 59 sec. North (44.99999620), Longitude: 134 deg. 59 min. 59 sec. East (134.99999240)"
																																							}
																																						]
																																					}
																																				]
																																			},
																																			{
																																				"name": "TN81",
																																				"size": 83.0,
																																				"children": [
																																					{
																																						"name": "VQK69",
																																						"anno": []
																																					},
																																					{
																																						"name": "TN73",
																																						"size": 32.0,
																																						"children": [
																																							{
																																								"name": "VQK47",
																																								"anno": []
																																							},
																																							{
																																								"name": "VQK79",
																																								"anno": []
																																							}
																																						]
																																					}
																																				]
																																			}
																																		]
																																	}
																																]
																															},
																															{
																																"name": "TN96",
																																"size": 96.0,
																																"children": [
																																	{
																																		"name": "TN89",
																																		"size": 86.0,
																																		"children": [
																																			{
																																				"name": "VQK4",
																																				"anno": [
																																					{
																																						"name": "cultivar",
																																						"value": "PI 597459C"
																																					},
																																					{
																																						"name": "Narrative",
																																						"value": ""
																																					},
																																					{
																																						"name": "Plant Name",
																																						"value": "ZYD3234"
																																					},
																																					{
																																						"name": "Life form",
																																						"value": "Annual"
																																					},
																																					{
																																						"name": "Pedigree",
																																						"value": ""
																																					},
																																					{
																																						"name": "Improvement status",
																																						"value": "Cultivated"
																																					},
																																					{
																																						"name": "Reproductive uniformity",
																																						"value": "Pureline"
																																					},
																																					{
																																						"name": "Locality",
																																						"value": "Shandong, China "
																																					},
																																					{
																																						"name": "Coordinates",
																																						"value": "Latitude: 37 deg. 13 min. 37 sec. North (37.22710440), Longitude: 119 deg. 55 min. 58 sec. East (119.93302510)"
																																					}
																																				]
																																			},
																																			{
																																				"name": "TN82",
																																				"size": 99.0,
																																				"children": [
																																					{
																																						"name": "VQK24",
																																						"anno": [
																																							{
																																								"name": "cultivar",
																																								"value": "PI 468400A"
																																							},
																																							{
																																								"name": "Narrative",
																																								"value": ""
																																							},
																																							{
																																								"name": "Plant Name",
																																								"value": ""
																																							},
																																							{
																																								"name": "Life form",
																																								"value": "Annual"
																																							},
																																							{
																																								"name": "Pedigree",
																																								"value": ""
																																							},
																																							{
																																								"name": "Improvement status",
																																								"value": "Wild"
																																							},
																																							{
																																								"name": "Reproductive uniformity",
																																								"value": "Pureline"
																																							},
																																							{
																																								"name": "Locality",
																																								"value": "Ningxia, China "
																																							},
																																							{
																																								"name": "Coordinates",
																																								"value": "Latitude: 37 deg. 19 min. 38 sec. North (37.32734130), Longitude: 106 deg. 2 min. 23 sec. East (106.03986360)"
																																							}
																																						]
																																					},
																																					{
																																						"name": "TN74",
																																						"size": 83.0,
																																						"children": [
																																							{
																																								"name": "VQK163",
																																								"anno": []
																																							},
																																							{
																																								"name": "VQK23",
																																								"anno": [
																																									{
																																										"name": "cultivar",
																																										"value": "PI 468916"
																																									},
																																									{
																																										"name": "Narrative",
																																										"value": ""
																																									},
																																									{
																																										"name": "Plant Name",
																																										"value": ""
																																									},
																																									{
																																										"name": "Life form",
																																										"value": "Annual"
																																									},
																																									{
																																										"name": "Pedigree",
																																										"value": ""
																																									},
																																									{
																																										"name": "Improvement status",
																																										"value": "Wild"
																																									},
																																									{
																																										"name": "Reproductive uniformity",
																																										"value": "Pureline"
																																									},
																																									{
																																										"name": "Locality",
																																										"value": "Liaoning, China "
																																									},
																																									{
																																										"name": "Coordinates",
																																										"value": "Latitude: 41 deg. 12 min. 4 sec. North (41.20138550), Longitude: 122 deg. 20 min. 29 sec. East (122.34158710)"
																																									}
																																								]
																																							}
																																						]
																																					}
																																				]
																																			}
																																		]
																																	},
																																	{
																																		"name": "VQK6",
																																		"anno": [
																																			{
																																				"name": "cultivar",
																																				"value": "PI 578357"
																																			},
																																			{
																																				"name": "Narrative",
																																				"value": ""
																																			},
																																			{
																																				"name": "Plant Name",
																																				"value": ""
																																			},
																																			{
																																				"name": "Life form",
																																				"value": ""
																																			},
																																			{
																																				"name": "Pedigree",
																																				"value": ""
																																			},
																																			{
																																				"name": "Improvement status",
																																				"value": "Wild"
																																			},
																																			{
																																				"name": "Reproductive uniformity",
																																				"value": ""
																																			},
																																			{
																																				"name": "Locality",
																																				"value": "Amur, Russian Federation "
																																			},
																																			{
																																				"name": "Coordinates",
																																				"value": ""
																																			}
																																		]
																																	}
																																]
																															}
																														]
																													},
																													{
																														"name": "TN110",
																														"size": 77.0,
																														"children": [
																															{
																																"name": "TN97",
																																"size": 76.0,
																																"children": [
																																	{
																																		"name": "VQK159",
																																		"anno": []
																																	},
																																	{
																																		"name": "VQK30",
																																		"anno": [
																																			{
																																				"name": "cultivar",
																																				"value": "PI 458536"
																																			},
																																			{
																																				"name": "Narrative",
																																				"value": ""
																																			},
																																			{
																																				"name": "Plant Name",
																																				"value": ""
																																			},
																																			{
																																				"name": "Life form",
																																				"value": "Annual"
																																			},
																																			{
																																				"name": "Pedigree",
																																				"value": ""
																																			},
																																			{
																																				"name": "Improvement status",
																																				"value": "Wild"
																																			},
																																			{
																																				"name": "Reproductive uniformity",
																																				"value": "Pureline"
																																			},
																																			{
																																				"name": "Locality",
																																				"value": "Heilongjiang, China "
																																			},
																																			{
																																				"name": "Coordinates",
																																				"value": "Latitude: 46 deg. 51 min. 50 sec. North (46.86415090), Longitude: 126 deg. 51 min. 17 sec. East (126.85484310)"
																																			}
																																		]
																																	}
																																]
																															},
																															{
																																"name": "TN98",
																																"size": 49.0,
																																"children": [
																																	{
																																		"name": "VQK144",
																																		"anno": []
																																	},
																																	{
																																		"name": "VQK44",
																																		"anno": []
																																	}
																																]
																															}
																														]
																													}
																												]
																											},
																											{
																												"name": "TN121",
																												"size": 86.0,
																												"children": [
																													{
																														"name": "VQK76",
																														"anno": []
																													},
																													{
																														"name": "VQK187",
																														"anno": []
																													}
																												]
																											}
																										]
																									},
																									{
																										"name": "TN131",
																										"size": 91.0,
																										"children": [
																											{
																												"name": "TN122",
																												"size": 43.0,
																												"children": [
																													{
																														"name": "VQK97",
																														"anno": []
																													},
																													{
																														"name": "TN111",
																														"size": 90.0,
																														"children": [
																															{
																																"name": "TN99",
																																"size": 93.0,
																																"children": [
																																	{
																																		"name": "VQK197",
																																		"anno": []
																																	},
																																	{
																																		"name": "TN90",
																																		"size": 34.0,
																																		"children": [
																																			{
																																				"name": "VQK135",
																																				"anno": []
																																			},
																																			{
																																				"name": "VQK199",
																																				"anno": []
																																			}
																																		]
																																	}
																																]
																															},
																															{
																																"name": "TN100",
																																"size": 27.0,
																																"children": [
																																	{
																																		"name": "VQK130",
																																		"anno": []
																																	},
																																	{
																																		"name": "VQK170",
																																		"anno": []
																																	}
																																]
																															}
																														]
																													}
																												]
																											},
																											{
																												"name": "TN123",
																												"size": 93.0,
																												"children": [
																													{
																														"name": "TN112",
																														"size": 91.0,
																														"children": [
																															{
																																"name": "VQK120",
																																"anno": []
																															},
																															{
																																"name": "VQK129",
																																"anno": []
																															}
																														]
																													},
																													{
																														"name": "TN113",
																														"size": 45.0,
																														"children": [
																															{
																																"name": "TN101",
																																"size": 93.0,
																																"children": [
																																	{
																																		"name": "VQK151",
																																		"anno": []
																																	},
																																	{
																																		"name": "VQK203",
																																		"anno": []
																																	}
																																]
																															},
																															{
																																"name": "TN102",
																																"size": 77.0,
																																"children": [
																																	{
																																		"name": "TN91",
																																		"size": 2.0,
																																		"children": [
																																			{
																																				"name": "VQK195",
																																				"anno": []
																																			},
																																			{
																																				"name": "VQK158",
																																				"anno": []
																																			}
																																		]
																																	},
																																	{
																																		"name": "VQK17",
																																		"anno": [
																																			{
																																				"name": "cultivar",
																																				"value": "PI 504286"
																																			},
																																			{
																																				"name": "Narrative",
																																				"value": ""
																																			},
																																			{
																																				"name": "Plant Name",
																																				"value": "75042"
																																			},
																																			{
																																				"name": "Life form",
																																				"value": "Annual"
																																			},
																																			{
																																				"name": "Pedigree",
																																				"value": ""
																																			},
																																			{
																																				"name": "Improvement status",
																																				"value": "Wild"
																																			},
																																			{
																																				"name": "Reproductive uniformity",
																																				"value": "Pureline"
																																			},
																																			{
																																				"name": "Locality",
																																				"value": "ChungchongPuk, Korea "
																																			},
																																			{
																																				"name": "Coordinates",
																																				"value": "Latitude: 36 deg. 48 min. 38 sec. North (36.81083300), Longitude: 127 deg. 47 min. 40 sec. East (127.79472200)"
																																			}
																																		]
																																	}
																																]
																															}
																														]
																													}
																												]
																											}
																										]
																									}
																								]
																							}
																						]
																					}
																				]
																			}
																		]
																	}
																]
															},
															{
																"name": "TN176",
																"size": 84.0,
																"children": [
																	{
																		"name": "VQK194",
																		"anno": []
																	},
																	{
																		"name": "VQK219",
																		"anno": []
																	}
																]
															}
														]
													}
												]
											}
										]
									},
									{
										"name": "TN203",
										"size": 28.000000000000004,
										"children": [
											{ "name": "VQK184", "anno": [] },
											{
												"name": "TN196",
												"size": 86.0,
												"children": [
													{
														"name": "VQK196",
														"anno": []
													},
													{
														"name": "TN186",
														"size": 97.0,
														"children": [
															{
																"name": "VQK20",
																"anno": [
																	{
																		"name": "cultivar",
																		"value": "PI 483460B"
																	},
																	{
																		"name": "Narrative",
																		"value": ""
																	},
																	{
																		"name": "Plant Name",
																		"value": ""
																	},
																	{
																		"name": "Life form",
																		"value": "Annual"
																	},
																	{
																		"name": "Pedigree",
																		"value": ""
																	},
																	{
																		"name": "Improvement status",
																		"value": "Wild"
																	},
																	{
																		"name": "Reproductive uniformity",
																		"value": "Pureline"
																	},
																	{
																		"name": "Locality",
																		"value": "Liaoning, China "
																	},
																	{
																		"name": "Coordinates",
																		"value": "Latitude: 41 deg. 5 min. 46 sec. North (41.09634030), Longitude: 123 deg. 15 min. 7 sec. East (123.25216670)"
																	}
																]
															},
															{
																"name": "VQK95",
																"anno": []
															}
														]
													}
												]
											}
										]
									}
								]
							}
						]
					},
					{ "name": "VQK90", "anno": [] }
				]
			}
		]
	}

    this.config.chart.data = data;

    this.chart = this.d4.init(this.config);
  },
  methods: {
    redraw() {
      this.chart.redraw();
    },
    deepRedraw() {
      this.chart.redraw(true);
    },
    colorChange(event) {
		var color = event.target.value;
		d3.selectAll(this.curLinks).style('stroke',color);
    },
    single() {
      this.selectedModule = "single";
      this.chart.setChartSelectModule(this.selectedModule);
    },
    multiple() {
      this.selectedModule = "multiple";
      this.chart.setChartSelectModule(this.selectedModule);
    }
  }
};
</script>

