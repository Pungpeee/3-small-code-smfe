<template>
  <section class="body-font  bg-blue-100 bg-opacity-30">
    <div class="min-w-screen min-h-screen container  mx-auto  flex flex-col  items-stretch px-8 py-8">
      <div class="flex flex-wrap pt-2 text-center items-center justify-end">
        <!-- <button type="button" data-modal-toggle="popup-add-sensor-modal"> -->
        <button type="submit" @click="addSensorButtonHandler()">
          <svg xmlns="http://www.w3.org/2000/svg"
            class="mt-2 rounded-full shadow-xl bg-green-400 text-white p-3 w-14 h-14" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
      <h2 class="pt-4 pl-4 title-font  text-4xl  font-bold">Dashboard</h2>

      <div>
        <a class="px-4">Filter</a>
        <input class="px-2" type="radio" id="all" value="all" v-model="pickedFilter" />
        <label class="px-2" for="all">All</label>
        <input class="px-2" type="radio" id="online" value="online" v-model="pickedFilter" />
        <label class="px-2" for="online">Online</label>
        <input class="px-2" type="radio" id="offline" value="offline" v-model="pickedFilter" />
        <label class="px-2" for="offline">Offline</label>
      </div>

      <div v-for="(device, key) in devices" :key="key">
        <div v-show="this.pickedFilter == 'all' || (
            device.sensor_records.length > 0 
            && (
              (this.pickedFilter == 'online' && new Date(device.sensor_records[0].timestamp).getTime() > (new Date().getTime() - 6*60000)) ||
              (this.pickedFilter === 'offline' && new Date(device.sensor_records[0].timestamp).getTime() <= (new Date().getTime() - 6*60000))
            )
          )">
          <div class="pt-6 pl-4">
            <a class="title-font text-xl font-bold">{{ device.name }}</a>
            <a class="pl-2 title-font text-l">(IMEI: {{ device.imei }})</a>
            <a class="px-2 title-font text-l">
              Latest update on
              <a v-if="device.sensor_records.length > 0" :set="timestamp=new Date(device.sensor_records[0].timestamp)">
                {{ timestamp.toLocaleDateString("en-US") }} {{ timestamp.toLocaleTimeString("en-US") }}
                <a class="text-green-500" v-if="this.timestamp.getTime() > (new Date().getTime() - 6*60000)">● Online</a>
                <a class=" text-red-500" v-else>● Offline</a>
              </a>
              <a v-else>
                N/A
              </a>
            </a>
            <button type="button" @click="openSensorEditorButtonHandler(device)"
              class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil"
                viewBox="0 0 16 16">
                <path
                  d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
              </svg>
            </button>
            <button type="button" @click="openSensorDeleterButtonHandler(device)"
              class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash"
                viewBox="0 0 16 16">
                <path
                  d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path fill-rule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
              </svg>
            </button>
          </div>
          <div class="flex flex-wrap text-center items-center justify-center">
            <!-- Soil Moisture -->
            <div v-if="device.sensor_records.length > 0 && device.sensor_records[0].data.hasOwnProperty('moisture')"
              class="p-4 md:w-2/6 sm:w-1/2 w-full">
              <div class="widget w-full p-4 rounded-lg  shadow-lg bg-white border-l-4 border-indigo-400 px-4 py-6">
                <div class="">
                  <img alt="content" class="rounded-full bg-indigo-400 text-white p-4 w-20 h-20 mb-3 inline-block"
                    src="@/assets/Iot/meter.png">
                </div>
                <h2 class="title-font font-medium text-3xl text-gray-900">{{ device.sensor_records[0].data.moisture }}
                </h2>
                <h2 class="title-font font-medium text-2xl text-gray-600">Soil Moisture</h2>
                <p class="leading-relaxed text-gray-600">Soil Moisture Content</p>
              </div>
            </div>
            <!-- PH Level -->
            <div v-if="device.sensor_records.length > 0 && device.sensor_records[0].data.hasOwnProperty('ph')"
              class="p-4 md:w-2/6 sm:w-1/2 w-full">
              <div class="widget w-full p-4 rounded-lg shadow-lg bg-white border-l-4 border-green-400 px-4 py-6">
                <div class="">
                  <img alt="content" class="rounded-full bg-green-400 text-white p-4 w-20 h-20 mb-3 inline-block"
                    src="@/assets/Iot/phbalance.png">
                </div>
                <h2 class="title-font font-medium text-3xl text-gray-900">{{ device.sensor_records[0].data.ph }}</h2>
                <h2 class="title-font font-medium text-2xl text-gray-600">PH Level</h2>
                <p class="leading-relaxed text-gray-600">Water PH Level</p>
              </div>
            </div>
            <!-- Light Intensity -->
            <div
              v-if="device.sensor_records.length > 0 && device.sensor_records[0].data.hasOwnProperty('light_intensity')"
              class="p-4 md:w-2/6 sm:w-1/2 w-full">
              <div class="widget w-full p-4 rounded-lg shadow-lg bg-white border-l-4 border-yellow-400 px-4 py-6">
                <div class="">
                  <img alt="content" class="rounded-full bg-yellow-400 text-white p-4 w-20 h-20 mb-3 inline-block"
                    src="@/assets/Iot/sun.png">
                </div>
                <h2 class="title-font font-medium text-3xl text-gray-900">{{ device.sensor_records[0].data.light_intensity
                }}</h2>
                <h2 class="title-font font-medium text-2xl text-gray-600">Ambient Light</h2>
                <p class="leading-relaxed text-gray-600">Ambient Light Content</p>
              </div>
            </div>
            <!-- Humidity -->
            <div v-if="device.sensor_records.length > 0 && device.sensor_records[0].data.hasOwnProperty('humidity')"
              class="p-4 md:w-2/6 sm:w-1/2 w-full">
              <div class="widget w-full p-4 rounded-lg shadow-lg bg-white border-l-4 border-blue-400 px-4 py-6">
                <div class="">
                  <img alt="content" class="rounded-full bg-blue-400 text-white p-4 w-20 h-20 mb-3 inline-block"
                    src="@/assets/Iot/meter.png">
                </div>
                <h2 class="title-font font-medium text-3xl text-gray-900">{{ device.sensor_records[0].data.humidity }}
                </h2>
                <h2 class="title-font font-medium text-2xl text-gray-600">Humidity</h2>
                <p class="leading-relaxed text-gray-600">Humidity Content</p>
              </div>
            </div>
            <!-- Temperature -->
            <div v-if="device.sensor_records.length > 0 && device.sensor_records[0].data.hasOwnProperty('temperature')"
              class="p-4 md:w-2/6 sm:w-1/2 w-full">
              <div class="widget w-full p-4 rounded-lg shadow-lg bg-white border-l-4 border-red-400 px-4 py-6">
                <div class="">
                  <img alt="content" class="rounded-full bg-red-400 text-white p-4 w-20 h-20 mb-3 inline-block"
                    src="@/assets/Iot/sun.png">
                </div>
                <h2 class="title-font font-medium text-3xl text-gray-900">{{ device.sensor_records[0].data.temperature }}
                </h2>
                <h2 class="title-font font-medium text-2xl text-gray-600">Temperature</h2>
                <p class="leading-relaxed text-gray-600">Temperature Content</p>
              </div>
            </div>
            <!-- Valve -->
            <div v-if="device.sensor_records.length > 0 && device.sensor_records[0].data.hasOwnProperty('sw')"
              class="p-4 md:w-2/6 sm:w-1/2 w-full">
              <!-- class="p-4 md:w-2/6 sm:w-1/2 w-full" :set="toggles[`${device.id}.sw`]=(device.sensor_records[0].data.sw==1)"> -->
              <div class="widget w-full p-4 rounded-lg shadow-lg bg-white border-l-4 border-blue-400 px-4 py-6">
                <div class="">
                  <img alt="content" class="rounded-full bg-blue-400 text-white p-4 w-20 h-20 mb-3 inline-block"
                    src="@/assets/Iot/plants.png">
                </div>
                <div>
                  <button @click="swButtonHandler(device.id, 'sw')" ref="ok"
                    class="relative inline-flex items-center h-6 rounded-full w-11 duration-200 select-none bg-gray-300"
                    :class="toggles[`${device.id}.sw`] ? 'bg-green-500' : 'bg-gray-500'">
                    <span class="sr-only">Enable notifications</span>
                    <span class="inline-block w-4 h-4 transform duration-300 bg-white rounded-full translate-x-1"
                      :class="toggles[`${device.id}.sw`] ? 'translate-x-6 ' : 'translate-x-1'"></span>
                  </button>
                </div>
                <h2 class="title-font font-medium text-2xl text-gray-600">OFF / ON</h2>
                <p class="leading-relaxed text-gray-600">Water valve sw of {{device.name}}</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="flex flex-wrap pt-6 text-center  items-center justify-center">
        <div class="flex flex-auto pt-6 text-center  items-center justify-center">
          <!-- ON / OFF -->
          <!-- <div class="p-4 md:w-2/6 sm:w-1/2 w-full">
            <div class="widget w-full p-4 rounded-lg shadow-lg bg-white border-l-4 border-purple-400 px-4 py-6">
              <div class="">
                <img alt="content" class="rounded-full bg-purple-400 text-white p-4 w-20 h-20 mb-3 inline-block"
                  src="@/assets/Iot/waterdrop.png">
              </div>
              <div class="">
                <button @click="toggle = !toggle" ref="ok"
                  class="relative inline-flex items-center h-6 rounded-full w-11 duration-200 select-none bg-gray-300"
                  :class="toggle ? 'bg-red-500' : 'bg-gray-500'">
                  <span class="sr-only">Enable notifications</span>
                  <span class="inline-block w-4 h-4 transform duration-300 bg-white rounded-full translate-x-1"
                    :class="toggle ? 'translate-x-1 ' : 'translate-x-6'"></span>
                </button>
              </div>
              <h2 class="title-font font-medium text-2xl text-gray-600">ON / OFF</h2>
              <p class="leading-relaxed text-gray-600">Turn on/off water pump</p>
            </div>
          </div> -->
          <!-- ON / OFF 2 -->
          <!-- <div class="p-4 md:w-2/6 sm:w-1/2 w-full">
            <div class="widget w-full p-4 rounded-lg shadow-lg bg-white border-l-4 border-blue-400 px-4 py-6">
              <div class="">
                <img alt="content" class="rounded-full bg-blue-400 text-white p-4 w-20 h-20 mb-3 inline-block"
                  src="@/assets/Iot/plants.png">
              </div>
              <div>
                <button @click="toggle2 = !toggle2" ref="ok"
                  class="relative inline-flex items-center h-6 rounded-full w-11 duration-200 select-none bg-gray-300"
                  :class="toggle2 ? 'bg-red-500' : 'bg-gray-500'">
                  <span class="sr-only">Enable notifications</span>
                  <span class="inline-block w-4 h-4 transform duration-300 bg-white rounded-full translate-x-1"
                    :class="toggle2 ? 'translate-x-1 ' : 'translate-x-6'"></span>
                </button>
              </div>
              <h2 class="title-font font-medium text-2xl text-gray-600">ON / OFF</h2>
              <p class="leading-relaxed text-gray-600">Turn on/off water valve in garden.</p>
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <div id="addSensorModal" class="relative hidden z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div
                  class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg class="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">Add A New Device</h3>
                  <div class="mt-2">
                    <div class="flex -mx-3">
                      <div class="w-full px-3 mb-5">
                        <label for="" class="text-xs font-semibold px-1">Device IMEI</label>
                        <div class="flex">
                          <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                            <i class="mdi mdi-email-outline text-gray-400 text-lg"></i>
                          </div>
                          <input type="text" placeholder="Enter Device IMEI" v-model="newDeviceIMEI"
                            class="w-full -ml-10 pl-5 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-green-500">
                        </div>
                        <label for="" v-if="newDeviceIMEIInvalid"
                          class="text-xs font-semibold text-red-500 px-1">{{this.newDeviceIMEIInvalid}}</label>
                      </div>
                    </div>
                    <div class="flex -mx-3">
                      <div class="w-full px-3 mb-5">
                        <label for="" class="text-xs font-semibold px-1">Device Name</label>
                        <div class="flex">
                          <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                            <i class="mdi mdi-email-outline text-gray-400 text-lg"></i>
                          </div>
                          <input type="text" placeholder="Enter Device Name" v-model="newDeviceName"
                            class="w-full -ml-10 pl-5 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-green-500">
                        </div>
                        <label for="" v-if="newDeviceNameInvalid"
                          class="text-xs font-semibold text-red-500 px-1">{{this.newDeviceNameInvalid}}</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button type="button" @click="confirmSensorAddingButtonHandler()"
                class="inline-flex w-full justify-center rounded-md border border-transparent bg-green-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Add</button>
              <button type="button" @click="cancelSensorAddingButtonHandler()"
                class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="editSensorModal" class="relative hidden z-10" aria-labelledby="modal-title" role="dialog"
      aria-modal="true">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div
                  class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg class="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">Edit A Device</h3>
                  <div class="mt-2">
                    <div class="flex -mx-3">
                      <div class="w-full px-3 mb-5">
                        <label for="" class="text-xs font-semibold px-1">Device IMEI</label>
                        <div class="flex">
                          <label for="" class="px-1">{{editingDeviceIMEI}}</label>
                        </div>
                      </div>
                    </div>
                    <div class="flex -mx-3">
                      <div class="w-full px-3 mb-5">
                        <label for="" class="text-xs font-semibold px-1">Device Name</label>
                        <div class="flex">
                          <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                            <i class="mdi mdi-email-outline text-gray-400 text-lg"></i>
                          </div>
                          <input type="text" placeholder="Enter Device Name" v-model="editingDeviceName"
                            class="w-full -ml-10 pl-5 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-green-500">
                        </div>
                        <label for="" v-if="editingDeviceNameInvalid"
                          class="text-xs font-semibold text-red-500 px-1">{{this.editingDeviceNameInvalid}}</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button type="button" @click="confirmSensorEditingButtonHandler()"
                class="inline-flex w-full justify-center rounded-md border border-transparent bg-green-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Edit</button>
              <button type="button" @click="cancelSensorEditingButtonHandler()"
                class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="deleteSensorModal" class="relative hidden z-10" aria-labelledby="modal-title" role="dialog"
      aria-modal="true">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div
                  class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"
                    stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path fill-rule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                  </svg>
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">Delete A Device</h3>
                  <div class="mt-2">
                    <div class="flex -mx-3">
                      <div class="w-full px-3 mb-5">
                        <label for="" class="text-xs font-semibold px-1">Device IMEI</label>
                        <div class="flex">
                          <label v-if="deletingDevice" for="" class="px-1">{{deletingDevice.imei}}</label>
                        </div>
                      </div>
                    </div>
                    <div class="flex -mx-3">
                      <div class="w-full px-3 mb-5">
                        <label for="" class="text-xs font-semibold px-1">Device Name</label>
                        <div class="flex">
                          <label v-if="deletingDevice" for="" class="px-1">{{deletingDevice.name}}</label>
                        </div>
                      </div>
                    </div>
                    <label for="" v-if="deletingDeviceInvalid"
                      class="text-xs font-semibold text-red-500 px-1">{{this.deletingDeviceInvalid}}</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button type="button" @click="confirmSensorDeletingButtonHandler()"
                class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Confirm</button>
              <button type="button" @click="cancelSensorDeletingButtonHandler()"
                class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import { useStore } from 'vuex'
const axios = require("axios")

export default {
  created() {
    const store = useStore()
    this.userId = store.state.user.uid
    this.newDeviceIMEI = ""
    this.newDeviceIMEIInvalid = ""
    this.newDeviceName = ""
    this.newDeviceNameInvalid = false
    this.editingDevice = null
    this.editingDeviceIMEI = ""
    this.editingDeviceName = ""
    this.editingDeviceNameInvalid = false
    this.deletingDevice = null
    this.deletingDeviceInvalid = false
    this.devices = []
    this.toggles = {}

    this.refreshDevices()
  },
  data() {
    return {
      newDeviceIMEI: this.newDeviceIMEI,
      newDeviceIMEIInvalid: this.newDeviceIMEIInvalid,
      newDeviceName: this.newDeviceName,
      newDeviceNameInvalid: this.newDeviceNameInvalid,
      editingDevice: this.editingDevice,
      editingDeviceIMEI: this.editingDeviceIMEI,
      editingDeviceName: this.editingDeviceName,
      editingDeviceNameInvalid: this.editingDeviceNameInvalid,
      deletingDevice: this.deletingDevice,
      deletingDeviceInvalid: this.deletingDeviceInvalid,
      devices: this.devices,
      timer: null,
      message: 'Test',
      toggles: this.toggles,
      // toggle: true,
      // toggle2: true,
      pickedFilter: 'all'
    };
  },
  mounted: function () {
    this.timer = setInterval(() => {
      this.refreshDevices()
    }, 30000)
  },
  beforeUnmount() {
    clearInterval(this.timer)
  },
  methods: {
    refreshDevices() {
      axios.post(this.firebaseBase + this.apiBase + '/device', {
        "user_id": this.userId,
      })
        .then(resp => {
          this.devices = resp.data.device_list;
          for (var idx in this.devices) {
            this.toggles[`${this.devices[idx].id}.sw`] = ('sw' in this.devices[idx].sensor_records[0].data) && (this.devices[idx].sensor_records[0].data.sw == 1);
          }
        });
    },
    swButtonHandler(deviceId, target) {
      this.toggles[`${deviceId}.${target}`] = !this.toggles[`${deviceId}.${target}`];
      var command = "off";
      if (this.toggles[`${deviceId}.${target}`]) {
        command = "on";
      }
      axios.post(this.firebaseBase + this.apiBase + '/sensor-record/command', {
        "device_id": deviceId,
        "target": target,
        "command": command,
      })
        .then(resp => {
          console.log('msg', resp.data.msg)
        });
    },
    addSensorButtonHandler() {
      this.newDeviceIMEI = ""
      this.newDeviceIMEIInvalid = ""
      this.newDeviceName = ""
      this.newDeviceNameInvalid = ""
      var element = document.getElementById("addSensorModal");
      element.classList.remove("hidden");
    },
    confirmSensorAddingButtonHandler() {
      if (this.newDeviceIMEI === "") {
        this.newDeviceIMEIInvalid = "Please input a valid Device IMEI"
      }
      else {
        this.newDeviceIMEIInvalid = ""
      }
      if (this.newDeviceName === "") {
        this.newDeviceNameInvalid = "Please input a valid Device Name"
      }
      else {
        this.newDeviceNameInvalid = ""
      }
      if (this.newDeviceIMEIInvalid || this.newDeviceNameInvalid) {
        return
      }
      axios.post(this.firebaseBase + this.apiBase + '/device/new', {
        "imei": this.newDeviceIMEI,
        "name": this.newDeviceName,
        "user_id": this.userId,
      })
        .then(resp => {
          this.refreshDevices()
          var element = document.getElementById("addSensorModal");
          element.classList.add("hidden");
        })
        .catch(resp => {
          console.log(resp)
          if (resp.response.data.msg === "Cannot create a new device: device imei already existed") {
            this.newDeviceIMEIInvalid = "Device IMEI already existed"
          }
        });
    },
    cancelSensorAddingButtonHandler() {
      this.newDeviceIMEI = ""
      this.newDeviceIMEIInvalid = false
      this.newDeviceName = ""
      this.newDeviceNameInvalid = false
      var element = document.getElementById("addSensorModal");
      element.classList.add("hidden");
    },
    openSensorEditorButtonHandler(device) {
      this.editingDevice = device
      this.editingDeviceIMEI = device.imei
      this.editingDeviceName = device.name
      this.editingDeviceNameInvalid = false
      var element = document.getElementById("editSensorModal");
      element.classList.remove("hidden");
    },
    confirmSensorEditingButtonHandler() {
      if (this.editingDeviceName === "") {
        this.editingDeviceNameInvalid = "Please input a valid Device Name"
      }
      else {
        this.editingDeviceNameInvalid = ""
      }
      if (this.editingDeviceNameInvalid) {
        return
      }
      axios.put(this.firebaseBase + this.apiBase + '/device', {
        "id": this.editingDevice.id,
        "name": this.editingDeviceName
      })
        .then(resp => {
          this.refreshDevices()
          var element = document.getElementById("editSensorModal");
          element.classList.add("hidden");
        })
        .catch(resp => {
          console.log(resp)
          if (resp.response.data.msg === "Cannot edit a device") {
            this.editingDeviceNameInvalid = "Something went wrong."
          }
        });
    },
    cancelSensorEditingButtonHandler() {
      this.editingDevice = null
      this.editingDeviceIMEI = ""
      this.editingDeviceName = ""
      this.editingDeviceNameInvalid = false
      var element = document.getElementById("editSensorModal");
      element.classList.add("hidden");
    },
    openSensorDeleterButtonHandler(device) {
      this.deletingDevice = device
      this.deletingDeviceInvalid = false
      var element = document.getElementById("deleteSensorModal");
      element.classList.remove("hidden");
    },
    confirmSensorDeletingButtonHandler() {
      axios.delete(this.firebaseBase + this.apiBase + '/device', {
        data: {
          "id": this.deletingDevice.id,
        }
      })
        .then(resp => {
          this.refreshDevices()
          var element = document.getElementById("deleteSensorModal");
          element.classList.add("hidden");
        })
        .catch(resp => {
          console.log(resp)
          if (resp.response.data.status === "failed") {
            this.deletingDeviceInvalid = "Something went wrong."
          }
        });
    },
    cancelSensorDeletingButtonHandler() {
      this.deletingDevice = null
      this.deletingDeviceInvalid = false
      var element = document.getElementById("deleteSensorModal");
      element.classList.add("hidden");
    },
  }
};
</script>

